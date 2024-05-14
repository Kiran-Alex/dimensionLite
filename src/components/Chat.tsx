import Link from "next/link"
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { v4 as uuidv4 } from "uuid"


interface datainterface {
    id: string,
    name: string,
    userId: string
}


const Chat = () => {
    const router = useRouter()
    const groups = api.profile.getGroups.useQuery()
    const pathname = router.query.id as string

    return (
        <>
            <div className="space-y-1 px-1">
                <label className="ml-4  text-lg">Chat</label>
                {groups.isFetched && groups?.data?.groups?.length == 0 ?
                    <div className="">Please Join or create a team </div> : groups.data?.groups?.map((grp) => {
                        groups.isFetched ? groups.refetch : null

                        return (
                            <>
                                <Link key={uuidv4()} className={`flex items-center py-1 pl-6 bg-gray-50 text-gray-600 transition-colors duration-300 transform rounded-lg mt-3 dark:text-gray-500 hover:bg-gray-200  hover:text-gray-700 ${pathname == grp.id && "!bg-gray-200"}`} href={`/chat/${grp.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                                    </svg>

                                    <span className="mx-2 text-md font-medium">{grp.name}</span>


                                </Link>
                            </>
                        )
                    })
                }
                {
                    groups.isLoading && <div>Loading...</div>
                }

                {
                  groups.isSuccess &&  groups.data?.groups == undefined && <div className="">Please Join or create a team </div>
                }
            </div>
        </>
    )
}

export default Chat