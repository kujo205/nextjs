import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
          <link rel="icon" type="image/x-icon" href="/images/site/coolface.png"/>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
