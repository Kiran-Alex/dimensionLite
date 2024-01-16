import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;  
}

const Layout = ({children}: Props) => {
  return (
    <>
       <div className="flex flex-col flex-grow p-3">
        {children}
       </div>
    </>
  )
}

export default Layout;
