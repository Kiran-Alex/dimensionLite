import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { CordProvider } from "@cord-sdk/react";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
const MyApp: AppType = ({ Component, pageProps }) => {
  const [cordToken, setCordToken] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const server = 'http://localhost:3000';
        const response = await fetch(`${server}/api/generate-cord-token`);
        const data:any = await response.json();
        setCordToken(data.clientAuthToken);
      } catch (error) {
        console.log('Something went wrong!: ', error);
      }
    };
    fetchData();
  }, [setCordToken]);
  


  return (

    <div className="flex flex-row" >
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <CordProvider clientAuthToken={cordToken} enableSlack={false} enableTasks={true}>
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
