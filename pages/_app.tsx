import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../contexts/AppContext";
import Layout from "../styles/Layout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster />
    </AppContext>
  );
}

export default MyApp;
