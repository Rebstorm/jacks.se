---
title: "ONNX: The Model Exchange Standard That Actually Stuck"
published_at: 2026-06-01T10:00:00.000Z
snippet: "What ONNX actually is under the hood, how the graph format works, and why it became the lingua franca for ML deployment."
---

# ONNX: The Model Exchange Standard That Actually Stuck

If you've spent any time around ML deployment you've run into ONNX. You've probably exported a model to it, maybe cursed at it, possibly shipped it to production. But it's one of those things where the "just export and go" workflow hides a surprisingly coherent design. Understanding how it actually works makes debugging a lot less mysterious and export-time decisions a lot more deliberate.

This is a breakdown of the format itself: how the graph is structured, what the opset system is doing, and where the seams are.

## The problem it solves

The ML ecosystem has a framework fragmentation problem. You train in PyTorch. Your mobile team needs CoreML. Your inference cluster runs TensorRT. Your edge device speaks TensorFlow Lite. Without a common format you're either re-implementing training in every target framework (painful) or writing bespoke converters for each pair (worse).

ONNX is a common intermediate representation. Train anywhere, export once, run on whatever runtime supports it. That's the pitch, and in practice it holds up reasonably well, with some caveats we'll get to.

## The graph model

An ONNX model is a computation graph. Specifically it's a directed acyclic graph where:

- **Nodes** represent operations (`Conv`, `MatMul`, `Relu`, `Reshape`, ...)
- **Edges** are named tensors flowing between them
- **Initializers** are the weights, constant tensors baked into the graph at export time
- **Inputs/outputs** are the boundary of the graph, what you feed in and what comes out

Every node has a list of named inputs and outputs. Connections between nodes are made purely by name matching. If node A produces an output called `"layer1_out"` and node B lists `"layer1_out"` as an input, they're connected. There's no explicit edge object. It's just string references.

```python
import onnx

model = onnx.load("my_model.onnx")
graph = model.graph

for node in graph.node:
    print(f"{node.op_type}: {list(node.input)} -> {list(node.output)}")
```

Running that over a simple ResNet will show you exactly what the graph looks like: hundreds of nodes, each with explicit named wiring. Verbose, but unambiguous.

## What's actually on disk

ONNX files are serialized [Protocol Buffers](https://protobuf.dev/). The `.onnx` schema is defined in the ONNX repo as `.proto` files, and what you load is a `ModelProto` containing a `GraphProto` containing a list of `NodeProto`s, `TensorProto`s for weights, and `ValueInfoProto`s for the named tensor types.

This matters for a few reasons:

1. **You can inspect and mutate the graph programmatically.** The Python `onnx` library gives you full access to all of this.
2. **The format is language-agnostic.** Anything that can read protobuf can read ONNX, which is part of why the runtime ecosystem is so wide.
3. **Weights are inlined.** Your `.onnx` file contains both the architecture and the trained weights. That's convenient but means large models produce large files (ResNet-50 is ~100MB).

## The opset system

Every node in the graph uses an operator, and operators are versioned. The version of the operator set a model uses is its **opset version**.

```python
print(model.opset_import)
# [domain: "" version: 17]
```

Opset 17 means "I'm using the ONNX standard operators at version 17." When an op changes behavior, say `Resize` added new coordinate transformation modes in opset 11, or `BatchNormalization` changed its training vs inference semantics in opset 14, a new opset version captures that.

This matters when:

- **Exporting**: PyTorch's `torch.onnx.export` has a `opset_version` parameter. Picking a higher opset gets you access to newer ops but narrows which runtimes can run the model. Picking a lower opset is safer for compatibility but may result in more decomposed, less efficient graphs.
- **Debugging shape errors**: an op that behaves unexpectedly might be doing so because the runtime is interpreting it against a different opset than you exported with.

As of mid-2026 opset 17-21 is a safe range for ONNX Runtime and most downstream tools. Default to 17 unless you need something specific from a newer version.

## Exporting from PyTorch

The standard path:

```python
import torch
import torch.onnx

model = MyModel()
model.eval()

dummy_input = torch.randn(1, 3, 224, 224)

torch.onnx.export(
    model,
    dummy_input,
    "my_model.onnx",
    opset_version=17,
    input_names=["image"],
    output_names=["logits"],
    dynamic_axes={"image": {0: "batch_size"}, "logits": {0: "batch_size"}},
)
```

A few things worth noting here:

**`model.eval()` is not optional.** Batch norm and dropout behave differently in training mode. If you export a model in training mode you'll get a graph that includes the training-time branches, which is not what you want.

**`dynamic_axes` is for runtime shape flexibility.** By default ONNX bakes in static shapes. The batch size of your dummy input becomes fixed in the graph. If you want to run inference with variable batch sizes, you need to declare those axes as dynamic at export time. You can also dynamicize height/width if you're building a model that needs to handle multiple resolutions.

**The dummy input drives tracing.** PyTorch's exporter traces the model by running it with the dummy input and recording ops. This means any Python-level control flow that branches on tensor values (not just shapes) may not export correctly; only one branch gets traced.

## Inspecting the graph

Two tools I use constantly:

**`onnx.checker`** validates the model against the spec:

```python
import onnx

model = onnx.load("my_model.onnx")
onnx.checker.check_model(model)
```

This catches shape mismatches, unknown ops, and malformed protobuf. If this passes, the model is well-formed. If it fails, the error message is usually specific enough to act on.

**[Netron](https://netron.app/)** is a browser-based (also installable) graph visualizer. Drop your `.onnx` file in and you get an interactive node graph. Invaluable for verifying that a complex architecture exported the way you expected, or for tracing where a shape deformation is happening.

## The runtime landscape

Having an ONNX file is half the story. Running it is the other half.

**ONNX Runtime** (from Microsoft) is the dominant choice and for good reason: it's fast, it's well-maintained, it supports a wide range of hardware through Execution Providers (EPs), and the Python API is simple:

```python
import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("my_model.onnx", providers=["CUDAExecutionProvider", "CPUExecutionProvider"])

input_name = session.get_inputs()[0].name
output = session.run(None, {input_name: np.random.randn(1, 3, 224, 224).astype(np.float32)})
```

The `providers` list is a priority order. If CUDA is available it'll use it; if not, fall back to CPU. You can also target DirectML (Windows GPU), CoreML (Apple Silicon), TensorRT (NVIDIA), and others.

Other runtimes worth knowing about:
- **TensorRT**: NVIDIA's high-performance inference engine. You can convert ONNX directly to a TRT engine with `trtexec`. Best raw throughput on NVIDIA hardware.
- **CoreML** via `coremltools`: the path for Apple Silicon deployment, including iOS/macOS apps.
- **TFLite** via `onnx-tf` or `ai-edge-torch`: for Android and embedded targets.

## Where it gets hard

ONNX works great for standard architectures. It gets complicated in a few cases:

**Custom ops.** If your model uses an operation that isn't in the ONNX standard operator set, you either need to decompose it into standard ops at export time, or register a custom op implementation in every runtime you want to target. Neither option is fun. This is the most common reason "it works in PyTorch but not in ONNX Runtime."

**Dynamic control flow.** ONNX does have `Loop` and `If` nodes, but PyTorch's tracer doesn't automatically produce them for Python-level conditionals. You need `torch.jit.script` to get the control flow captured, and even then the mapping isn't always clean.

**Quantization.** Quantized models introduce a whole additional layer of op variants (`QLinearConv`, `QLinearMatMul`, etc.) and calibration data. If you're exporting a quantized model, test end-to-end against the specific runtime you're targeting. The interop story here is shakier than for fp32.

## When to reach for it

ONNX is a good default choice when:
- You're deploying to a production inference service and want to decouple the model artifact from the training framework
- You need to target multiple runtimes or devices from one export
- You're using ONNX Runtime specifically. It's excellent and actively developed.

It's less compelling when:
- Your model heavily uses ops outside the standard set
- You're doing research and iterating fast. The export step adds friction.
- You're already all-in on a framework that has its own optimized deployment path (e.g., JAX + XLA, or pure TensorRT)

---

ONNX has been around since 2017 and it's held up. The graph model is clean, the tooling is solid, and ONNX Runtime in particular has become a serious inference engine in its own right. If you've been treating it as a black-box export step, it's worth understanding what's actually in that file.

Signing out!

Paul
