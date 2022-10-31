import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import { AppContext } from "../contexts/AppContext";
import Layout from "../styles/Layout";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Toaster />
      </UserProvider>
    </AppContext>
  );
}

export default MyApp;
