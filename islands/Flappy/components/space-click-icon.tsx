import { getTheme } from "../../../utils/css/theme.ts";

export const SpaceClickIcon = () => {
  const theme = getTheme();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      fill={theme === "dark" ? "#fff" : "#000"}
      viewBox="0 0 24 24" // Common viewBox size for icons
      width="64px" // Set width to 32px
      height="64px" // Set height to 32px
    >
      <path d="M20,9v6H4V9H2v6a2,2 0 0,0 2,2h16a2,2 0 0,0 2,-2V9h-2Z" />
    </svg>
  );
};
