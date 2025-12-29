import type { ComponentChildren, FunctionalComponent } from "preact";

interface RustParagraphProps {
    children?: ComponentChildren;
}

let confettiMod: any | null = null;

const ConfettiParagraph: FunctionalComponent<RustParagraphProps> = (props) => {
    const handleClick = async () => {
        // Load only when needed (and only in the browser)
        if (!confettiMod) {
            confettiMod = await import("canvas-confetti");
        }

        const confetti = confettiMod.default ?? confettiMod;

        confetti({
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

export default ConfettiParagraph;
