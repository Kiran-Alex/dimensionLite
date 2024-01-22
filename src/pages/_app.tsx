import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { useState,useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { CordProvider } from "@cord-sdk/react";
const MyApp: AppType = ({ Component, pageProps }) => {
  const [ cordToken, setCordToken ] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        // Change this to wherever your server is running.
        const server = 'http://localhost:3000';
        const response = await fetch(`${server}/api/generate-cord-token`);
        const data = await response.json();
        setCordToken(data.clientAuthToken);
      } catch (error) {
        console.log('Something went wrong!: ', error);
      }
    })();
  }, [setCordToken]);


  return (

    <div className="flex flex-row" >
      <CordProvider clientAuthToken={cordToken}>
      <ThemeProvider>
        <ClerkProvider {...pageProps}>
          <Sidebar />

          <Component {...pageProps} />
        </ClerkProvider>
      </ThemeProvider>
      </CordProvider>
    </div>);
};

export default api.withTRPC(MyApp);
