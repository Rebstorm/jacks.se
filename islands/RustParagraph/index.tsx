import { ComponentChildren, FunctionalComponent } from "preact";

// Load canvas-confetti from a CDN
const confetti = await import("https://esm.sh/canvas-confetti@1.5.1");

interface RustParagraphProps {
  children?: ComponentChildren;
}

const RustParagraph: FunctionalComponent<RustParagraphProps> = (props) => {
  const handleClick = () => {
    // Trigger confetti animation
    confetti.default({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.9 },
    });
  };

  return (
      <div className="inline interactable" onClick={handleClick}>
        {props.children}
      </div>
  );
};

export default RustParagraph;
