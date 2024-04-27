import Link from "next/link"
import { useState } from "react";
import {
    Collapse,
    Button,
    Card,
    Typography,
    CardBody,
} from "@material-tailwind/react";
import { useRouter } from "next/router";


const Team = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const pathname = router.pathname.replace("/", "")
    const toggleOpen = () => setOpen((cur) => !cur);
    return (
        <>
            <div className="space-y-1 px-1">
                <label className="px-2  text-sm ">Teams</label>
                <Link href={"/team"}  className={`px-2 text-sm w-5/5 flex flex-row justify-between cursor-pointer hover:bg-gray-100  hover:text-gray-700 rounded-lg ${pathname == "team" && "bg-gray-100"}`}><span className="flex flex-row justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 font-thin text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
                    &nbsp;&nbsp;&nbsp;<span className="text-gray-600 text-xs">My Tasks</span> </span>
                </Link>

                <Link className={`flex items-center px-2 py-1  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100  hover:text-gray-700 ${pathname == "team/create" && "bg-gray-100"}`} href="/team/create">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>


                    <span className="mx-2 text-xs font-medium">Create a Team</span>
                </Link>

                <Link className={`flex items-center px-2 py-1  text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-500 hover:bg-gray-100  hover:text-gray-700 ${pathname == "team/join" && "bg-gray-100"}`} href="/team/join">


                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>





                    <span className="mx-2 text-xs font-medium">Join a Team</span>
                </Link>






                <Collapse open={open}>
                    <Card placeholder={"fr"} className="my-4 mx-auto w-8/12">
                        <CardBody placeholder={"fr"}>
                            <Typography placeholder={"fr"}>
                                Use our Tailwind CSS collapse for your website. You can use if for
                                accordion, collapsible items and much more.
                            </Typography>
                        </CardBody>
                    </Card>
                </Collapse>


            </div>
        </>
    )
}

export default Team