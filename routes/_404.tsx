// routes/_404.tsx (or wherever your NotFoundPage lives)
import { PageProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import { H2 } from "../components/h2.tsx";
import { H3 } from "../components/h3.tsx";
import Bug from "../islands/Bug/index.tsx";

export default function NotFoundPage({ url }: PageProps) {
    const notFoundLink = url?.pathname.split("/")[1];

    return (
        <div class="center">
            <Head>
                <link rel="preload" href={asset("/css/404.css")} as="style" />
                <link rel="stylesheet" href={asset("/css/404.css")} />
            </Head>

            <Bug />

            <H2 gradientColor>404</H2>
            <H3>{notFoundLink}</H3>
            <main>
                The page you’re looking for got eaten by a bug 🐛<br />
                Can you squash it?
            </main>
        </div>
    );
}