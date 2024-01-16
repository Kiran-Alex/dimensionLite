import logo from "../../public/logo.png"
import Link from "next/link"
import Setting from "./Setting"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/router"


const Sidebar = () => {
    const [NavState, setNavState] = useState("settings")
    const router = useRouter()
    const renderNavState = ()=> {
        switch (NavState) {
            case "settings":
                
                return <Setting />
                break;
        
            default:
                <h1>nothing</h1>
                break;
        }
    }
    return (
        <>
            <aside className="flex w-fit">
                <div className="flex flex-col items-center w-12 h-screen pb-8 pt-4 bg-white dark:border-gray-700">
                    <nav className="flex flex-col items-center flex-1 space-y-3 ">
                        <Link href="/" onClick={()=>{setNavState("index")}} className="mb-2">
                            <Image className="w-auto h-6  scale-100" src={logo} alt="" />
                        </Link>

                        <Link href="/go" onClick={()=>{setNavState("chat")}} className="p-1.5 inline-block dark:text-gray-500  focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100 active:bg-blue-100 focus:bg-blue-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 19, height: 19 }} className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                            </svg>

                        </Link>

                        <a href="#" className="p-1.5 inline-block dark:text-gray-500 text-blue-500 transition-colors duration-200  rounded-lg   hover:bg-gray-100 active:bg-blue-100 focus:bg-blue-100 ">
                            <svg style={{ width: 19, height: 19 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                            </svg>

                        </a>

                        <a href="#" className="p-1.5 inline-block dark:text-gray-500  focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100 active:bg-blue-100 focus:bg-blue-100 ">
                            <svg style={{ width: 19, height: 19 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                            </svg>

                        </a>

                        <a href="#" className="p-1.5 inline-block dark:text-gray-500  focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100 active:bg-blue-100 focus:bg-blue-100 ">
                            <svg style={{ width: 19, height: 19 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                            </svg>

                        </a>

                        <Link href="/settings" onClick={()=>{setNavState("settings")}} className="p-1.5 inline-block dark:text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg  hover:bg-gray-100 ">
                            <svg style={{ width: 19, height: 19 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </Link>
                    </nav>

                    <div className="flex flex-col items-center mt-4 space-y-4">


                        <a href="#" className=" transition-colors duration-200 rotate-180  rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                            <svg style={{ width: 19, height: 19 }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="h-screen px-3 pb-8 pt-4 overflow-y-auto bg-white sm:w-64 w-60 ">
                    <div className="relative flex flex-row  w-5/5 items-center justify-between">
                        <div className="flex flex-row items-center">
                            <img width="25" height="25" src="https://img.icons8.com/ios/100/f-key.png" alt="f-key" />
                            <p className="ml-2 text-sm">Fleet</p></div>
                        <div className=""><img className="object-cover w-7 h-7 rounded-2xl" width={1.8} height={1.8} src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" /></div>
                    </div>

                    <nav className="mt-4 -mx-3 space-y-6  ">
                        {renderNavState()}
                            

                    </nav>
                </div>
            </aside>

        </>
    )
}

export default Sidebar