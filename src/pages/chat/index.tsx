import Layout from '~/components/Layout'
import Link from 'next/link'
import Pusher from "pusher-js"
import { ChatBox } from '~/components/ChatBox'
import { v4 as uuidv4 } from "uuid"

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { api } from '~/utils/api'
import { Textarea, IconButton } from "@material-tailwind/react";
import { useState, useEffect } from 'react'

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(!open) };

  let a: never[] = []        

  chats.forEach((l) => {
    a.push(l)
  })
  const handletext = (e: any) => {
    setText(e.target.value);
  };

  const summarizer=  api.openAI.summarizer.useMutation()

  const { mutate, data } = api.pusher.message.useMutation()


  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_PUSHER_KEY)
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("chat");

    channel.bind("message", (data: any) => {
      setChats((prevChats): any => {
        return [...prevChats, data];
      });
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const handleSummarize = () => {
    handleOpen();
     const res =  summarizer.mutate({texts : a});

  }


  return (
    <>
      <Layout>
        <div className="h-8 w-full flex flex-row items-center">
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

          </div>
        </div>
        <div className="flex flex-grow justify-between flex-col ">
          <div className='h-5/6 w-5/5 px-6 pt-2' style={{ height: "90%", overflowY: "scroll" }}>
            <div className="flex flex-col gap-2">

              {chats.map((chat) => {

                return (
                  <div className="flex-1 rounded-lg p-2 bg-gray-50" key={uuidv4()}>
                    <p className="text-sm font-bold">{data?.username}</p>
                    <p className="text-sm">{chat}</p>
                  </div>
                );
              })}

            </div>
          </div>
          <div className='h-1/6 w-5/5' style={{ height: "9%" }}>
            <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
              <div className="flex">
                <IconButton placeholder={"fr"} onClick={()=>{handleSummarize() } 
                   } variant="text" className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </IconButton>
                <IconButton placeholder={"fr"} variant="text" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                    />
                  </svg>
                </IconButton>
              </div>
              <Textarea
                onChange={handletext}
                value={text}
                rows={1}
                resize={true}
                placeholder="Your Message"
                className="min-h-full !border-0 focus:border-transparent"
                containerProps={{
                  className: "grid h-full",
                }}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div>
                <IconButton onClick={() => {
                  mutate({ message: text })
                  setText("")
                }} placeholder={"fr"} variant="text" className="rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </IconButton>
                <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
                  <DialogHeader placeholder={"rf"}>Summary</DialogHeader>
                  <DialogBody placeholder={"rf"}>
{!summarizer.isLoading?summarizer.data:"...Loading"}
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
                    
                  </DialogFooter>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "39em" }} className='flex  flex-col justify-center overflow-auto'>
          <main className="flex flex-col flex-1">
            <div className="flex-1 p-4 ">
              <div className="flex flex-col gap-2">

                {chats.map((chat) => {

                  return (
                    <div className="flex-1 rounded-lg p-2 bg-gray-50" key={uuidv4()}>
                      <p className="text-sm font-bold">{data?.username}</p>
                      <p className="text-sm">{chat}</p>
                    </div>
                  );
                })}

              </div>
            </div>

          </main>



        </div>
        <div className="flex flex-col ">
          <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
            <div className="flex">
              <IconButton placeholder={"fr"} variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </IconButton>
              <IconButton placeholder={"fr"} variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </IconButton>
            </div>
            <Textarea

              onChange={handletext}
              value={text}
              rows={1}
              resize={true}
              placeholder="Your Message"
              className="min-h-full !border-0 focus:border-transparent"
              containerProps={{
                className: "grid h-full",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div>
              <IconButton onClick={() => {
                mutate({ message: text })
                setText("")
              }} placeholder={"fr"} variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>



        </div> */}
      </Layout>
    </>
  )
}

export default Chat