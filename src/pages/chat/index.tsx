import Layout from '~/components/Layout'
import Link from 'next/link'
import { PagePresence } from '@cord-sdk/react';
import { api } from '~/utils/api';
import { useState, useEffect } from 'react'
import { Thread } from '@cord-sdk/react';
import toast from 'react-hot-toast';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [allGroups , setAllGroups] = useState<[{
    id: string;
    name: string;
    userId: string;
    }]>();
  const usergroups = api.profile.getGroups.useQuery();

  useEffect (()=>{
    if (usergroups.isFetched) {
      usergroups.data?.groups?.map((grp)=> {
        setAllGroups([grp])
        console.log(allGroups)
      })
    }
  },[usergroups.isLoading])

  const a: never[] = [];

  chats.forEach((l) => {
    a.push(l);
  });
  return (
    <>
      <Layout>
        <div className="h-8 w-full flex flex-row items-center justify-between">
          <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
            <Link href="/settings" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
              Team
            </Link>
            <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </span>
            <a href="#" className="text-gray-500 dark:text-gray-400 font-bold text-sm hover:underline">
              General
            </a>
            &nbsp;
          </div>
          <PagePresence groupId="4727ca45-ce34-4b08-8d46-25b88a186c60" />
        </div>
        <div className="flex flex-grow justify-between flex-col ">
        {/* <Thread threadId="4727ca45-ce34-4b08-8d46-25b88a186c60" groupId="4727ca45-ce34-4b08-8d46-25b88a186c60" composerExpanded ={true} onRender={()=>{
          toast.success("rendered")
        }} showPlaceholder={true}/> */}
        <div className='w-full h-full bg-gray-200 rounded-md flex flex-row justify-center items-center'>
          <div className='w-1/5 h-1/12 text-center '>Select a Chat To Start Messaging</div>
        </div>
        </div>
      </Layout>
    </>
  )
}

export default Chat