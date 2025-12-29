import { PageProps } from "fresh";
import { asset, Head } from "fresh/runtime";
import { H2 } from "@/components/h2.tsx";
import { H3 } from "@/components/h3.tsx";
import Bug from "@/islands/Bug/index.tsx";

export default function NotFoundPage(errorProps: PageProps) {
  const notFoundLink = errorProps?.url?.pathname.split("/")[1];

  return (
    <div class="center">
      <Head>
        <link rel="preload" href={asset("/css/404.css")} as="style" />
        <link rel="stylesheet" href={asset("/css/404.css")} />
      </Head>

      <Bug />

      <H2 gradientColor>{errorProps.error}</H2>
      <H3>{notFoundLink}</H3>
      <main>
        The page you’re looking for got eaten by a bug 🐛<br />
        Can you squash it?
      </main>
    </div>
  );
}
