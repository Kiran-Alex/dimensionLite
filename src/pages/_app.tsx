import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";
import { api } from "~/utils/api";
import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (

    <div className="flex flex-row" >
      <ThemeProvider>
        <ClerkProvider {...pageProps}>
          <Sidebar />

          <Component {...pageProps} />
        </ClerkProvider>
      </ThemeProvider>
    </div>);
};

export default api.withTRPC(MyApp);
