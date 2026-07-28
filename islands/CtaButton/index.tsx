import { useEffect } from "preact/hooks";

let confettiMod: any = null;

export default function CtaButton() {
  useEffect(() => {
    import("canvas-confetti").then((mod) => {
      confettiMod = mod;
    });
  }, []);

  const handleClick = async () => {
    const mod = confettiMod ?? await import("canvas-confetti");
    confettiMod = mod;
    const fire = mod.default ?? mod;

    fire({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#4073fa", "#f06", "#9f6", "#f0a"],
    });

    setTimeout(() => {
      fire({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#4073fa", "#f06"],
      });
      fire({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#9f6", "#f0a"],
      });
    }, 150);
  };

  return (
    <a
      href="mailto:paul@paul.wiki"
      class="cta-button cta-button--fun"
      onClick={handleClick}
    >
      Get in touch
    </a>
  );
}
