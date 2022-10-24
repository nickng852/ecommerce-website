import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../contexts/AppContext";
import Layout from "../styles/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext>
  );
}

export default MyApp;
