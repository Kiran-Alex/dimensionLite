import { useRouter } from 'next/router'
import { PagePresence, Thread } from '@cord-sdk/react'
import { toast } from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import Layout from '~/components/Layout'
import { api } from '~/utils/api'
import { useCopyToClipboard } from "usehooks-ts";
import { useState } from 'react'
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
import { ChevronUpIcon } from "@heroicons/react/24/solid";
export default function Id() {
  const router = useRouter()
  const { data, isFetched, isLoading } = api.group.GetGroupOnId.useQuery({ groupId: router.query.id as string })
  const [threadload, SetThreadLoad] = useState(false)
  const [open, setOpen] = useState(false);
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const handleOpen = () => setOpen(!open);

  return <>
    <Layout>
      <           div className="h-8 w-full flex flex-row items-center justify-between">
        <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
          <span className="text-black dark:text-black  text-sm pl-2 font-bold flex flex-row justify-center items-center">
            {isFetched && data?.name}&nbsp;&nbsp;
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



        <Thread  onLoading={() => {
          SetThreadLoad(true)
        }} threadId={router.query.id as string} groupId={router.query.id as string} composerExpanded={true} onRender={() => {
        
          SetThreadLoad(false)
        }} showPlaceholder={true} />



      </div>
    </Layout>
  </>
}