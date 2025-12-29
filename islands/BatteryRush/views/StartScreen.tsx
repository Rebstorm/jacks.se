// views/StartScreen.tsx
import { FunctionalComponent } from "preact";

interface StartScreenProps {
  onStart: (useMotionControls: boolean) => void;
  score?: number;
}

const StartScreen: FunctionalComponent<StartScreenProps> = (
  { onStart, score },
) => {
  const handleStart = async (event: Event) => {
    const isTouch = event.type === "touchstart";
    if (isTouch) {
      // Request motion permission for touch devices
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        // @ts-expect-error This is a part of the API. Really.
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          // @ts-expect-error This is a part of the API.
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission === "granted") {
            onStart(true); // Use motion controls
            return;
          } else {
            alert("Motion controls are required to play this game.");
          }
        } catch (error) {
          console.error("DeviceMotion permission request failed:", error);
        }
      }

      // We only ever need permissions on safari.
      onStart(true);
      return;
    }

    // If not touch or permission is denied, use keyboard controls
    onStart(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Battery Rush</h1>
      <p>A motion-controlled 2D game</p>
      {(score! > 1) && <div>Your score: {score}</div>}
      <button
        onClick={handleStart}
        onTouchStart={handleStart}
        className={"funButton"}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartScreen;
