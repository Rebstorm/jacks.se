import { ComponentChildren, FunctionalComponent } from "preact";

interface RustButtonProps {
  children?: ComponentChildren;
}

const RustButton: FunctionalComponent = (props: RustButtonProps) => {
  return (
    <div className={"inline"} onClick={(event) => console.info(event)}>
      {props.children}
    </div>
  );
};

export default RustButton;
