import { useRef, useEffect } from "preact/hooks";

const FontLink = () => {
  const linkRef = useRef(null);

  useEffect(() => {
    // Check if the ref is currently pointing to a DOM element
    if (linkRef.current) {
      // Add an event listener to the 'load' event
      linkRef.current.onload = () => {
        linkRef.current.rel = "stylesheet";
      };
    }
    // Clean up the event listener to avoid memory leaks
    return () => {
      if (linkRef.current) {
        linkRef.current.onload = null;
      }
    };
  }, []); // The empty array ensures that this useEffect is run once after the initial render.

  return (
    <link
      ref={linkRef}
      rel="preload"
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
      as="style"
    />
  );
};

export default FontLink;
