import Layout from "~/components/Layout"
import Image from "next/image"
const index = () => {
    return (
        <Layout>
            <div className="h-8 w-full flex flex-row items-center">
                <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
                    <a href="#" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
                        Settings
                    </a>
                    {/* <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>

                    <a href="#" className="text-gray-600 dark:text-gray-200 hover:underline">
                        Profile
                    </a>

                    <span className="mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>

                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Settings
                    </a> */}
                </div>
            </div>
            <div className="flex flex-grow justify-center ">
                <div style={{ height: "34em" }} className="w-2/5 mt-10 flex flex-col just\
                 ">
                    <div className="h-fit w-5/5"><h1 className="text-gray-500 text-xl font-bold">Profile</h1></div>
                    <div className="flex-grow h-4/5">
                        <div className="w-5/5 flex flex-row justify-center mt-6">
                            <Image className="object-cover w-48 h-48 rounded-full" width={170} height={12} src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj" alt="" />


                        </div>

                        <label className="block text-sm text-gray-500 dark:text-gray-600">Name</label>

                        <input type="text" placeholder="Fleet" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300" />

                        <label className="block text-sm text-gray-500 mt-2 dark:text-gray-600">Realm URL</label>

                        <input type="text" placeholder="dimesionlite/a45dfrdf" className="block  mt-2 w-full  dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300" />

                        <label className="block text-sm text-gray-500 mt-2 dark:text-gray-600">Tag Line</label>

                        <input type="text" placeholder="Fleet" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300" />

                    </div>
                    <div className="w-5/5 h-fit flex flex-row justify-end"><button className="px-3 py-1 text-sm tracking-wide flex flex-row font-thin text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        save&nbsp; <svg className="w-4 h-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                    </button> </div>
                </div>
            </div>
        </Layout>
    )
}

export default index