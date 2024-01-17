import Layout from "~/components/Layout"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
const integration = () => {
    return (<>
    <Head>
        <title>Integration</title>
    </Head>
        <Layout>
            <div className="h-8 w-full flex flex-row items-center">
                <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
                    <Link href="/settings" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
                        Settings
                    </Link>
                    <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>

                    <a href="#" className="text-gray-500 dark:text-gray-400 font-bold text-sm hover:underline">
                        Integrations
                    </a>

                </div>
            </div>
            <div className="flex flex-grow pl-5 w-5/5 ">
                <div style={{ height: "34em" }} className=" mt-8 flex flex-col w-9/12  ">
                    <div className="h-fit w-5/5"><h1 className="text-gray-500 text-xl font-bold">Integrations</h1></div>
                    
                </div>
            </div>
        </Layout>
        </>)
}

export default integration