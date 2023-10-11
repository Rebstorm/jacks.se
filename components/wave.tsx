export const Wave = () => {
  return (
    <div className={"overflow-hidden"}>
      <svg
        class="wave"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -50 2000 130"
      >
        <path
          fill="var(--background-contrast)"
          d="M0,50 C500,-50 500,150 1000,50 C1500,-50 1500,150 2000,50 V100 H0 Z"
        ></path>
      </svg>
    </div>
  );
};
export default Wave;
