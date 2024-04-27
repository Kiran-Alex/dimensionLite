import { useRouter } from 'next/router'
import { PagePresence, Thread } from '@cord-sdk/react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useCopyToClipboard } from "usehooks-ts";
import { useState, useEffect } from 'react'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Link from 'next/link'
import { user } from '@cord-sdk/react';
import axios from 'axios'
import { AxiosResponse } from 'axios'

type usershape = AxiosResponse<{
  users: [
    {
      id: string
    }
  ]
}>
export default function Id() {
  const router = useRouter()
  const { data, isFetched, isLoading } = api.group.GetGroupOnId.useQuery({ groupId: router.query.id as string })
  const [threadload, SetThreadLoad] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const getuserData = api.profile.info.useQuery()
  const serverToken = api.token.serverToken.useQuery();
  const [stateStatus, setStateStatus] = useState(false)
  const handleOpen = () => setOpen(!open);

  const handleUseratGroup = async () => {
    try {
      const res: usershape = await axios.get(`https://api.cord.com/v1/groups/${router.query.id?.toString()}/members`, {
        headers: {
          Authorization: `Bearer ${serverToken.data?.token}`
        }
      });
      if (res.status >= 200 && res.status <= 209) {
        const userExist = res.data.users.find((user) => user.id == getuserData.data?.info.id);
        if (userExist) {
          return true;
        } else {
          return false;
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const checkUserExistence = async () => {
      const res = await handleUseratGroup();
      if (res === true) {
        console.log('user exist');
        setStateStatus(false)
        router.reload()
      } else {
        console.log("user not exist");
        setStateStatus(true)
      }
    };

    checkUserExistence().catch((err) => { console.log(err) })
  }, []);

  return <>
    <Layout>
      <div className="h-8 w-full flex flex-row items-center justify-between">
        <div className="flex pl-5 items-center overflow-x-auto whitespace-nowrap">
          <span className="text-black dark:text-black  text-sm  font-bold flex flex-row justify-center items-center">
            <Link href="/chat" className="text-black dark:text-black hover:underline text-sm mr-1 font-bold">
              {"Team"}
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 " viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            {isFetched && <span className='ml-2 text-gray-500'> {data?.name}</span>}&nbsp;&nbsp;
            {isFetched &&
              <>
                <Menu placement="bottom">
                  <MenuHandler >
                    <div className='hover:bg-gray-200 hover:cursor-pointer p-[2px] rounded-xl'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4  ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                    </div>
                  </MenuHandler>
                  <MenuList placeholder={"rf"} >

                    <MenuItem onMouseLeave={() => setCopied(false)}
                      onClick={async () => {
                        try {
                          await copy(router.query.id as string);
                          setCopied(true);
                          toast.success("Copied");
                        } catch (error) {
                          console.error("Error copying:", error);
                          toast.error("Failed to copy");
                        }
                      }} className='hover:bg-white uppercase' placeholder={"rf"}>
                      Copy Group Code
                    </MenuItem>


                  </MenuList>

                </Menu>
              </>
            }
            {isLoading && "Loading..."}
          </span>
          {/* create issue dialog */}
          <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
            <DialogHeader placeholder={"rf"}><Input className="h-24" crossOrigin={"rf"} type='text' placeholder='enter title' label='Title' /></DialogHeader>
            <DialogBody placeholder={"rf"}>
              <Textarea className="h-60" label='Description' />
            </DialogBody>
            <DialogFooter placeholder={"rf"}>
              <Button
                placeholder={"rf"}
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button placeholder={"rf"} variant="gradient" color="green" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">

          </span>
          &nbsp;
        </div>
        <PagePresence groupId={router.query.id as string} />
      </div>
      <div className="flex flex-grow justify-between flex-col ">


        {stateStatus ? 
          <Thread
           threadId={router.query.id as string} groupId={router.query.id as string} composerExpanded={true} showPlaceholder={true} /> :
          <p>Loading ...</p>
        }


      </div>
    </Layout>
  </>
}