import Layout from "~/components/Layout"
import Image from "next/image"
import { api } from "~/utils/api"
const index = () => {

    const profilepic = api.profile.ProfilePicture.useQuery()
    const userInfo = api.profile.info.useQuery()
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
                    <div className="flex-grow h-5/5">
                        <div className="w-5/5 flex flex-row justify-center mt-6">
                            {profilepic.isFetched&& profilepic.data?.profilePicture!== undefined && <Image className="object-cover w-48 h-48 rounded-full" width={170} height={12} src={profilepic.data?.profilePicture} alt="" />}
                            {profilepic.isLoading && <div className="animate-pulse w-48 h-48 rounded-full bg-gray-300" ></div> }
                        </div>

                        <label className="block text-sm text-gray-500 dark:text-gray-600">Name</label>

                        <input type="text" placeholder={userInfo.data?.info.username ?? ''} disabled className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300" />

                        <label className="block text-sm text-gray-500 mt-2 dark:text-gray-600">Email</label>

                        <input type="text" placeholder={userInfo.data?.info.mail ?? ""} disabled className="block  mt-2 w-full  dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300" />
                    </div>
                   
                </div>
            </div>
        </Layout>
    )
}

export default index