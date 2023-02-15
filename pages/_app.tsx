import Head from "next/head";
import { Noto_Sans } from "@next/font/google";
import "../styles/normalize.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

const noto_sans = Noto_Sans({
  weight: ["100", "400", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <title>The Pokedex App</title>
      </Head>
      <style jsx global>{`
        * {
          font-family: ${noto_sans.style.fontFamily};
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
