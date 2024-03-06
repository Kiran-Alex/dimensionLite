import { useRouter } from 'next/router'
import { PagePresence ,Thread} from '@cord-sdk/react'
import { toast } from 'react-hot-toast'
import {v4 as uuidv4} from 'uuid'
import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useState } from 'react'
export default function Id() {
  const router = useRouter()
    const {data,isFetched,isLoading} = api.group.GetGroupOnId.useQuery({groupId : router.query.id as string})
    const [threadload,SetThreadLoad] = useState(false)
  return <>
    <Layout>
<           div className="h-8 w-full flex flex-row items-center justify-between">
          <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
            <span className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
              {isFetched  ? data?.name : "Loading..."}
            </span>
            <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
          
            </span>
            &nbsp;
          </div>
          <PagePresence groupId={router.query.id as string} />
        </div>
        <div className="flex flex-grow justify-between flex-col ">
            

       
        <Thread onLoading={()=>{
            SetThreadLoad(true)
        }} threadId={router.query.id as string} groupId={router.query.id as string} composerExpanded ={true} onRender={()=>{
          toast.success("rendered")
            SetThreadLoad(false)
        }} showPlaceholder={true}/>

        
        
        </div>
        </Layout>
  </>
}