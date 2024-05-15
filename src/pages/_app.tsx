import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { CordProvider } from "@cord-sdk/react";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

import "~/styles/globals.css";
const MyApp: AppType = ({ Component, pageProps }) => {
  const [cordToken, setCordToken] = useState<string>();
  const {data ,isFetched} = api.token.clientToken.useQuery()

  useEffect(() => {

    if(isFetched){
    const fetchData = async () => {
      try {
        // const server = 'http://localhost:3000';
        // const response = await fetch(`${server}/api/generate-cord-token`);
        // const data = await response.json() as { clientAuthToken: string };
       
       
          setCordToken(data?.token)
           console.log('data', data);
       
      } catch (error) {
        console.log('Something went wrong!: ', error);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
}

  }, [isFetched]);



  return (

    <div className="flex flex-row overflow-y-hidden" >
      <RecoilRoot>
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
      </RecoilRoot>
    </div>);
};

export default api.withTRPC(MyApp);
