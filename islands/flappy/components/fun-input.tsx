import { FunctionalComponent, h } from "preact";

export interface FunInputProps {
  onValueChange: (value: string) => void;
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
      <input type="text" onKeyUp={handleChange} className="funInput" />
    </div>
  );
};
