import { type AppType } from "next/app";
import Sidebar from "~/components/Sidebar";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<div className="flex flex-row" >
  <Sidebar/>
  <Component {...pageProps} /></div>);
};

export default api.withTRPC(MyApp);
