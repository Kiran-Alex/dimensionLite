import Link from "next/link"
import { useState } from "react";
import {
    Collapse,
    Button,
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { api } from "~/utils/api";


const Chat = () => {
    // const [open, setOpen] = useState(false);
    // const toggleOpen = () => setOpen((cur) => !cur);
    
    return (
        <>
            <div className="space-y-1 px-1">
                <label className="px-2  text-sm ">Chat</label>
                
                <div>
                <p className="px-2 text-sm w-5/5 flex flex-row justify-between cursor-pointer mt-4"><span className="flex flex-row justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                    &nbsp;&nbsp;&nbsp;<span className="text-gray-600 text-xs">TEAM</span> </span>
                    
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg> */}
                </p>
                </div>

                <Link className="flex items-center px-3 py-1 pl-6 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100  hover:text-gray-700" href="/chat">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                    </svg>

                    <span className="mx-2 text-xs font-medium">General</span>
                </Link>
                
                

                {/* <Collapse open={open}>
                    <Card placeholder={"fr"} className="my-4 mx-auto w-8/12">
                        <CardBody placeholder={"fr"}>
                            <Typography placeholder={"fr"}>
                                Use our Tailwind CSS collapse for your website. You can use if for
                                accordion, collapsible items and much more.
                            </Typography>
                        </CardBody>
                    </Card>
                </Collapse> */}
            </div>
        </>
    )
}

export default Chat