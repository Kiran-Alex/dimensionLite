import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { linkParser } from '~/utils/linkParser';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from 'next/image';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
    Select,
    Option,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Spinner
} from "@material-tailwind/react";
import toast from 'react-hot-toast';




type CommentsDataSchema = AxiosResponse<[{
    body: string,
    updated_at: string,
    id: number,
    user: {
        avatar_url: string,
        login: string
    }
}]>;

export default function Id() {
    const router = useRouter();
    const [grpId, setGrpId] = useState<string>("")
    const [date, setDate] = useState<Date | undefined>()
    const [todoStatus, setTodoStatus] = useState<boolean | undefined>(undefined)
    const [projectType, setProjectType] = useState<string>("")
    const [projectTag, setProjectTag] = useState<string>("")
    const [externalLink, setExternalLink] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [FetchedComments, setFetchedComments] = useState<CommentsDataSchema["data"]>()
    dayjs.extend(relativeTime);
    const deleteTodo = api.todo.deleteTodo.useMutation({
        onSuccess: async () => {
            handleOpen()
            toast.success("Todo Deleted")
            await router.push('/team')

        }
    })
    const retreiveGitToken = api.integration.GithubRetreiveToken.useQuery()
    const updateTodo = api.todo.updateMasterTodo.useMutation({
        onSuccess: async (info) => {
            if (todoStatus !== undefined && projectType !== "" && projectTag !== "" && date !== undefined && externalLink !== undefined) {
                if (info.todoexist.GithubIssueNo !== null && info.todoexist.GithubIssueNo !== undefined) {
                    try {
                        const parsedLink = linkParser(externalLink)
                        let state
                        if (todoStatus == true) {
                            state = "closed"
                        }
                        else if (todoStatus == false) {
                            state = "open"
                        }

                        if (state !== undefined && state !== null && state !== "") {
                            console.log(state)
                            const resaxios = await axios.post(`https://api.github.com/repos/${parsedLink.username}/${parsedLink.repository}/issues/${info.todoexist.GithubIssueNo}`, {
                                "state": state,
                                "labels": [projectType, projectTag]
                            }, {
                                headers: {
                                    "Accept": "application/vnd.github.v3+json",
                                    "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                                    "X-GitHub-Api-Version": "2022-11-28",
                                }
                            })
                            if (resaxios.status >= 200 && resaxios.status <= 209) {
                                toast.success("Issue Updated")
                            }
                            else {

                                toast.error("Error in updating the issue")
                                console.log(resaxios.data)

                            }
                        }
                    }
                    catch (err) {
                        console.log(err)

                    }
                }

                toast.success("Todo Updated")
            }
            if (info.todoexist.groupId == null && date !== undefined || projectType !== "" || projectTag !== "") {
                toast.success("Todo Updated")
            }
        }
    })
    const getGroupinfo = api.group.GetGroupOnId.useQuery({ groupId: grpId })
    const getTodoInfo = api.todo.getTodoOnId.useMutation({
        onSuccess: async (info) => {
            if (info.todo.GithubIssueNo !== null && info.todo.GithubIssueNo !== undefined && info.todo.groupId !== null) {
                setGrpId(info.todo.groupId)
                const groupInfo = await getGroupinfo.refetch()
                if (groupInfo.isSuccess) {
                    const parsedGroupLink = linkParser(groupInfo.data?.RepositoryLink)
                    setExternalLink(`https://github.com/${parsedGroupLink.username}/${parsedGroupLink.repository}/issues/${info.todo.GithubIssueNo}`)
                    setGrpId("")
                }
            }
            if (info.todo) {
                setTodoStatus(info.todo.done)
            }

            if (info.todo.date !== null && info.todo.date !== undefined) {
                setDate(info.todo.date)
                console.log(date)

            }
            if (info.todo.projectType !== null && info.todo.projectType !== undefined) {
                setProjectType(info.todo.projectType)
            }
            if (info.todo.projectTag !== null && info.todo.projectTag !== undefined) {
                setProjectTag(info.todo.projectTag)
            }

            if (info.todo.groupId !== null && info.todo.groupId !== undefined) {
                setGrpId(info.todo.groupId)
                const groupInfo = await getGroupinfo.refetch()
                if (groupInfo.isSuccess) {
                    const parsedGroupLink = linkParser(groupInfo.data?.RepositoryLink)
                    try {
                        if (info.todo.GithubIssueNo !== null && info.todo.GithubIssueNo !== undefined) {
                            const res: CommentsDataSchema = await axios.get(`https://api.github.com/repos/${parsedGroupLink.username}/${parsedGroupLink.repository}/issues/${info.todo.GithubIssueNo}/comments`, {
                                headers: {
                                    "Accept": "application/vnd.github.v3+json",
                                    "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                                    "X-GitHub-Api-Version": "2022-11-28",
                                }
                            })
                            if (res.status >= 200 && res.status <= 209) {
                                console.log(res.data)
                                setFetchedComments(res.data)
                            }
                            else {
                                console.log("error in fetching the comments")
                            }
                        }
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                else {
                    await getGroupinfo.refetch()
                }
            }



        }
    })

    useEffect(() => {
        if (router.query.id) {
            getTodoInfo.mutate({ taskId: router.query.id as string })
        }
    }, [router.query.id])



    const handleOpen = () => setOpen(!open);

    const handleUpdate = async () => {
        console.log(todoStatus, date, projectType, projectTag, externalLink)



        if (todoStatus !== undefined && date !== undefined || projectType !== "" || projectTag !== "" || externalLink !== undefined) {
            {
                updateTodo.mutate({
                    done: todoStatus!,
                    taskId: router.query.id as string,
                    date: date,
                    projectType: projectType,
                    projectTag: projectTag,
                })

            }
        }
    }

    const handleDelete = async () => {
        deleteTodo.mutate({ taskId: router.query.id as string })

    }


    const loadingWithLabel = (label: string) => {
        return (
            <div className='flex flex-col'>
                <p className='text-gray-500 pl-1 mb-1'>{label} </p>
                <div className='flex flex-row items-center'>
                    <p className={`pl-2 font-bold  text-black mr-3`}>Loading</p><Spinner />
                </div>
            </div>
        )
    }

    const handleComment = async () => {
        if (getGroupinfo.data?.RepositoryLink == null) {
            toast.error("No Repository Link Found")
        }
        if (getTodoInfo.data?.todo.groupId == null) {
            toast.error("No Team Selected")
        }
        if (getGroupinfo.data?.RepositoryLink !== null && getTodoInfo.data?.todo.groupId !== null) {
            const parsedLink = linkParser(getGroupinfo.data?.RepositoryLink)
            try {
                const resaxios = await axios.post(`https://api.github.com/repos/${parsedLink.username}/${parsedLink.repository}/issues/${getTodoInfo.data?.todo.GithubIssueNo}/comments`, {
                    "body": comment
                }, {
                    headers: {
                        "Accept": "application/vnd.github.v3+json",
                        "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                        "X-GitHub-Api-Version": "2022-11-28",
                    }
                })

                if (resaxios.status >= 200 && resaxios.status <= 209) {
                    toast.success("Comment Added")
                    const res: CommentsDataSchema = await axios.get(`https://api.github.com/repos/${parsedLink.username}/${parsedLink.repository}/issues/${getTodoInfo.data?.todo.GithubIssueNo}/comments`, {
                        headers: {
                            "Accept": "application/vnd.github.v3+json",
                            "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                            "X-GitHub-Api-Version": "2022-11-28",
                        }
                    })
                    if (res.status >= 200 && res.status <= 209) {

                        setFetchedComments(res.data)
                    }

                }
            }
            catch (err) {
                console.log(err)
                toast.error("Error in adding the comment")
            }

        }
    }

    const handleRefresh = async () => {
        const parsedGroupLink = linkParser(externalLink)

        try {
            console.log(parsedGroupLink.username, parsedGroupLink.repository, getTodoInfo.data?.todo.GithubIssueNo)
            await axios.get(`https://api.github.com/repos/${parsedGroupLink.username}/${parsedGroupLink.repository}/issues/${getTodoInfo.data?.todo.GithubIssueNo}/comments`, {
                headers: {
                    "Accept": "application/vnd.github.v3+json",
                    "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                    "X-GitHub-Api-Version": "2022-11-28",
                },
             
            }).then((res:CommentsDataSchema)=>{
              
                setFetchedComments(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
            
           
        }
        catch (err) {
            console.log(err)

        }

    }


    return (
        <>
            <div className="flex flex-row w-screen overflow-y-hidden">
                <div className="flex flex-col h-screen w-[75%] p-3">
                    <div className="h-8 w-full flex flex-row items-center ">
                        <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
                            <Link href="/team" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
                                Team
                            </Link>
                            <span className="mx-1 text-gray-500 dark:text-gray-300 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            {getTodoInfo.isLoading && <div className="w-28 h-7 bg-gray-200 animate-pulse ">
                            </div>}
                            {getTodoInfo.isSuccess && <a href="#" className="text-gray-500 dark:text-gray-400 font-bold text-sm hover:underline">
                                {getTodoInfo.data?.todo.title}
                            </a>}
                            &nbsp;
                        </div>
                    </div>
                    <div className="flex h-screen flex-col ">
                        <div className=" flex flex-col h-[91%] justify-between  items-center ">
                            <div className="w-full h-[35%] overflow-auto py-3 px-6">
                                <p className="font-bold text-sm text-gray-400 mb-4">Description :</p>
                                <p className="h-6/6">
                                    {getTodoInfo.data?.todo.description !== undefined && getTodoInfo.data?.todo.description !== null && getTodoInfo.data?.todo.description !== "" && getTodoInfo.data?.todo.description}
                                    {getTodoInfo.data?.todo.description == undefined || getTodoInfo.data?.todo.description == null || getTodoInfo.data?.todo.description == "" && <p>No Description</p>}
                                    {getTodoInfo.isLoading && <div className=" w-96 h-7 bg-gray-200 animate-pulse "></div>}
                                </p>
                            </div>
                            {getTodoInfo.data?.todo.GithubIssueNo !== null && getTodoInfo.data?.todo.GithubIssueNo !== undefined ?
                                <div className="w-[95%] h-[60%] mb-5 p-3 bg-gray-100 rounded rounded-xl ">
                                    <div className='flex flex-row justify-between w-full'><p className="font-bold text-sm text-gray-400 mb-2  ">Activity</p>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 hover:cursor-pointer" onClick={async()=>{await handleRefresh()}}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>

                                    </div>
                                    <div className='w-full h-[95%] py-2 overflow-auto '>
                                        {FetchedComments?.[0] == undefined && <div className='flex flex-grow justify-center items-center h-full text-gray-500 font-bold'>No Comments</div>}
                                        <Timeline >
                                            {FetchedComments?.map((comment) => {
                                                
                                                return (
                                                    <>
                                                        <TimelineItem key={comment.id} className="h-28">
                                                            <TimelineConnector className="!w-[78px]" />
                                                            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                                                                <TimelineIcon variant="ghost">
                                                                    <Image alt='avatar' src={comment.user.avatar_url} width={50} height={50} className="rounded-full" />
                                                                </TimelineIcon>
                                                                <div className="flex flex-col gap-1">
                                                                    <Typography placeholder={"rf"} variant="h6" color="blue-gray">
                                                                        {comment.body}
                                                                    </Typography>
                                                                    <Typography placeholder={"rf"} variant="small" color="gray" className="font-normal">
                                                                       {dayjs(comment.updated_at).fromNow()}
                                                                    </Typography>
                                                                </div>
                                                            </TimelineHeader>
                                                        </TimelineItem>
                                                    </>
                                                )
                                            })} </Timeline>
                                        {FetchedComments == undefined && <div>Loading...</div>}
                                    </div>
                                </div>
                                : <div className="w-[95%] h-[60%] mb-5 p-3 bg-gray-100 rounded rounded-xl ">
                                    <p className="font-bold text-sm text-gray-400 mb-2  ">Activity</p>
                                    <div className='w-full h-[95%] py-2 overflow-auto '>
                                        {FetchedComments?.[0] == undefined && <div className='flex flex-grow justify-center items-center h-full text-gray-500 font-bold'>No Activity</div>}
                                    </div>
                                </div>}
                        </div>
                        <div className=" w-full flex flex-row justify-center">
                            <div className="relative flex w-[96%] ">
                                <Input
                                    crossOrigin
                                    type="text"
                                    label="Add Comment"
                                    value={comment}
                                    onChange={(e) => { setComment(e.target.value) }}
                                    className="pr-20"
                                    containerProps={{
                                        className: "min-w-0",
                                    }}
                                />
                                <Button
                                    placeholder={"rf"}
                                    size="sm"
                                    color={comment ? "gray" : "blue-gray"}
                                    disabled={!comment}
                                    className="!absolute right-1 top-1 rounded"
                                    onClick={handleComment}
                                >
                                    Send
                                </Button>
                            </div></div>
                    </div>
                </div>
                <div className="h-screen w-[25%] border border-l-2 flex flex-col">
                    <div className='h-[80%] w-full  flex flex-col justify-around p-3'>
                        {getTodoInfo.isLoading && loadingWithLabel("Todo Status")}
                        {getTodoInfo.isLoading && loadingWithLabel("Team")}
                        {getTodoInfo.isLoading && loadingWithLabel("Project Type")}
                        {getTodoInfo.isLoading && loadingWithLabel("Project Tag")}
                        {getTodoInfo.isLoading && getGroupinfo.isLoading && loadingWithLabel("Issue Link")}
                        {getTodoInfo.isSuccess && <>
                            <div className='flex flex-col'>
                                <p className='text-gray-500 pl-1 mb-1'>Todo Status </p>
                                <div className='flex flex-row items-center'>
                                    <p className={`pl-2 font-bold ${getTodoInfo.isSuccess && todoStatus !== undefined && todoStatus == true ? "text-green-300" : "text-black"}`}>{getTodoInfo.isSuccess && todoStatus ? "Done" : "Not Yet Done"}</p>
                                    <svg onClick={(e) => { e.preventDefault(), setTodoStatus(!todoStatus) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-4 hover:cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg> </div>
                            </div>
                        </>}

                        {getTodoInfo.isSuccess && getGroupinfo.isSuccess &&
                            <div className='flex flex-col'>
                                <p className='text-gray-500 pl-1 mb-1'>Team </p>
                                <div className='flex flex-row items-center'>
                                    <p className={`pl-2 font-bold "text-black"}`}>{getGroupinfo.data.name}</p>
                                </div>
                            </div>}

                        {
                            getTodoInfo.isSuccess && getGroupinfo.data?.name == null && <div className='flex flex-col'>
                                <p className='text-gray-500 pl-1 mb-1'>Team </p>
                                <div className='flex flex-row items-center'>
                                    <p className={`pl-2 font-bold "text-black"}`}>Not Selected</p>
                                </div>
                            </div>
                        }
                        {date !== undefined && <><div className='flex flex-col'><p className='text-gray-500 pl-1 mb-1'>Date : </p> <input type="date" value={date ? date.toISOString().split('T')[0] : undefined} onChange={(e) => { e.preventDefault(); setDate(new Date(e.target.value)) }} className="border border-gray-200 p-2 rounded rounded-md" /></div></>}
                        {date == undefined && <><div className='flex flex-col'><p className='text-gray-500 pl-1 mb-1'>Date (Not Asssigned) : </p> <input type="date" value={date} onChange={(e) => { e.preventDefault(); setDate(new Date(e.target.value)) }} className="border border-gray-200 p-2 rounded rounded-md" /></div></>}
                        {getTodoInfo.isSuccess && <><div className='flex flex-col'>     <Select placeholder={"rf"} value={projectType} className=" border-gray-200" onChange={(val) => { setProjectType(val!) }} label="Project">
                            <Option value="Web">Web</Option>
                            <Option value="Mobile">Mobile</Option>
                            <Option value="Cloud">Cloud</Option>
                            <Option value="Desktop">Desktop</Option>
                            <Option value="Server">Server</Option>
                            <Option value="Other">Other</Option>
                        </Select> </div></>}
                        {getTodoInfo.isSuccess && <>
                            <div className='flex flex-col'>
                                <Select placeholder={"rf"} value={projectTag} className=" border-gray-200" onChange={(val) => { setProjectTag(val!) }} label="Tag">
                                    <Option value="Bug">Bug</Option>
                                    <Option value="Feature">Feature</Option>
                                    <Option value="Improvement">Improvement</Option>
                                    <Option value="Refactor">Refactor</Option>
                                    <Option value="Other">Other</Option>

                                </Select> </div></>}
                        {getTodoInfo.isSuccess && externalLink !== undefined && externalLink !== null && getTodoInfo.data?.todo.GithubIssueNo !== null && <div className='flex flex-col'><p className='text-gray-500 pl-1 mb-1'>Issue Link </p>
                            <Button placeholder={"rf"} variant='outlined' className="flex items-center gap-6" onClick={(e) => { e.preventDefault(), window.location.assign(externalLink) }}>

                                Issue # {getTodoInfo.data.todo.GithubIssueNo}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>

                            </Button>
                        </div>}

                        {getTodoInfo.isSuccess && getTodoInfo.data.todo.groupId !== null && getGroupinfo.data?.RepositoryLink == null && <div className='flex flex-col'><p className='text-gray-500 pl-1 mb-1'>Issue Link </p>
                            <Button placeholder={"rf"} disabled className="flex items-center gap-6 cursor-not-allowed">
                                Repo Not Assigned
                            </Button>
                        </div>}

                        {getTodoInfo.isSuccess && getTodoInfo.data.todo.groupId == null && <div className='flex flex-col'><p className='text-gray-500 pl-1 mb-1'>Issue Link </p>
                            <Button placeholder={"rf"} disabled className="flex items-center gap-6 cursor-not-allowed">
                                No team Was Selected
                            </Button>
                        </div>}
                    </div>
                    <div className='h-[20%] w-full flex flex-col justify-around px-3 border-t-2 border-gray-300'>
                        <Button placeholder={"rf"} variant='gradient' size='lg' color='red' onClick={handleOpen} >Delete</Button>
                        <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
                            <DialogHeader placeholder={"rf"}>Confirmation</DialogHeader>
                            <DialogBody placeholder={"rf"}>
                                <h2 className='text-black font-bold text-lg mb-4'>Note : </h2>
                                <ul className='capitalize list-disc text-black ml-5 font-sans font-medium' >
                                    <li>this action is irreversible and the todo will be deleted permanently </li>
                                    <li>If you are sure about this action click confirm</li>
                                    <li>If you integrate your GitHub account, this action will not have any effect on the issue</li>
                                </ul>

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
                                <Button placeholder={"rf"} variant="gradient" color="green" onClick={handleDelete}>
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                        <Button placeholder={"rf"} variant='gradient' size='lg' onClick={async (e) => { e.preventDefault(); await handleUpdate() }} >Update</Button>
                    </div>
                </div>
            </div>
        </>
    );
}





