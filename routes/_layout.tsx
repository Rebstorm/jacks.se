import { LayoutProps } from "$fresh/server.ts";

export default function Layout({ Component }: LayoutProps) {
  // do something with state here
  return (
    <>
      <div className={"innerContainer"}>
        <Component />
      </div>
    </>
  );
}
