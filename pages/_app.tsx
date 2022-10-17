import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </GoogleOAuthProvider>
  );
}

export default MyApp;
