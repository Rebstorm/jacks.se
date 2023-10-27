import { FunctionalComponent, h } from "preact";

export interface FunInputProps {
  onValueChange: (value: string) => void;
  label?: string;
}
export const FunInput: FunctionalComponent<FunInputProps> = (
  props: FunInputProps
) => {
  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement; // Type assertion, so TypeScript understands the type of the event target
    props.onValueChange(target.value); // Call the prop function with the new value
  };

  return (
    <div>
      <label>{props.label}</label>
      <input type="text" onKeyUp={handleChange} className="funInput" />
    </div>
  );
};
