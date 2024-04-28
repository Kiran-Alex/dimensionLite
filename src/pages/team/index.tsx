import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  Select,
  Option,
  Textarea,
  Tooltip
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast";
import { linkParser } from "~/utils/linkParser";
import axios from "axios";
import Link from "next/link";

interface ResponseData {
  Project_Type: string;
  Project_Tag: string;
}

const Index = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [team, setTeam] = useState<string>("")
  const [projectType, setProjectType] = useState<string>("")
  const [projectTag, setProjectTag] = useState<string>("")
  const [uid, setUid] = useState<string>("")
  const [UTeamId, setUTeamId] = useState<string>("")
  const handleOpen = () => setOpen(!open);
  const getGroupinfo = api.group.GetGroupOnId.useQuery({ groupId: UTeamId })
  const groups = api.profile.getGroups.useQuery()
  const todo = api.todo.create.useMutation({
    onSuccess: async () => {

      if (team !== undefined && team !== "") {

        const thisGroup = groups.data?.groups?.find((grp) => grp.id === team)
        if (thisGroup?.RepositoryLink !== undefined || thisGroup?.RepositoryLink !== null && retreiveGitToken.data?.githubAuthToken !== null || retreiveGitToken.data?.githubAuthToken !== undefined) {
          const repo = linkParser(thisGroup?.RepositoryLink)
          try {
            if(projectTag == "" && projectType == ""){
              const res: { data: { number: string }, status: number } = await axios.post(`https://api.github.com/repos/${repo.username}/${repo.repository}/issues`, {
                "title": title,
                "body": description,
               
              }, {
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                  "X-GitHub-Api-Version": "2022-11-28",
                }
              })
  
              if (res.status >= 200 && res.status <= 209) {
                updateIssueNo.mutate({ issueNo: res.data.number.toString(), taskId: uid })
                console.log(res.data.number)
                setUid("")
                setTitle("")
                setDescription("")
                setDate("")
                setTeam("")
                setUid("")
              }
            }
            if(projectTag !== "" && projectType !== ""){
              try{
              const res: { data: { number: string }, status: number } = await axios.post(`https://api.github.com/repos/${repo.username}/${repo.repository}/issues`, {
                "title": title,
                "body": description,
                "labels": [projectType, projectTag]
              }, {
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                  "X-GitHub-Api-Version": "2022-11-28",
                }
              })
            
  
              if (res.status >= 200 && res.status <= 209) {
                updateIssueNo.mutate({ issueNo: res.data.number.toString(), taskId: uid })
                console.log(res.data.number)
                setUid("")
                setTitle("")
                setDescription("")
                setDate("")
                setTeam("")
                setUid("")
              }}
              catch(err) {
                console.log(err)
              }

            }
            if(projectTag !== "" && projectType == ""){
              const res: { data: { number: string }, status: number } = await axios.post(`https://api.github.com/repos/${repo.username}/${repo.repository}/issues`, {
                "title": title,
                "body": description,
                "labels": [ projectTag]
              }, {
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                  "X-GitHub-Api-Version": "2022-11-28",
                }
              })
  
              if (res.status >= 200 && res.status <= 209) {
                updateIssueNo.mutate({ issueNo: res.data.number.toString(), taskId: uid })
                console.log(res.data.number)
                setUid("")
                setTitle("")
                setDescription("")
                setDate("")
                setTeam("")
                setUid("")
              }
            }
            if(projectTag == "" && projectType !== ""){
              const res: { data: { number: string }, status: number } = await axios.post(`https://api.github.com/repos/${repo.username}/${repo.repository}/issues`, {
                "title": title,
                "body": description,
                "labels": [projectType]
              }, {
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                  "X-GitHub-Api-Version": "2022-11-28",
                }
              })
  
              if (res.status >= 200 && res.status <= 209) {
                updateIssueNo.mutate({ issueNo: res.data.number.toString(), taskId: uid })
                console.log(res.data.number)
                setUid("")
                setTitle("")
                setDescription("")
                setDate("")
                setTeam("")
                setUid("")
              }
            }

            const res: { data: { number: string }, status: number } = await axios.post(`https://api.github.com/repos/${repo.username}/${repo.repository}/issues`, {
              "title": title,
              "body": description,
              "labels": [projectType, projectTag]
            }, {
              headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
              }
            })

            if (res.status >= 200 && res.status <= 209) {
              updateIssueNo.mutate({ issueNo: res.data.number.toString(), taskId: uid })
              console.log(res.data.number)
              setUid("")
              setTitle("")
              setDescription("")
              setDate("")
              setTeam("")
              setUid("")
            }


          }
          catch (err) {
            console.log(err)
          }

        }
        else {
          setTitle("")
          setDescription("")
          setDate("")
          setTeam("")
          setUid("")
          toast.success("Task created")
        }
      }
      else {

        setTitle("")
        setDescription("")
        setDate("")
        setTeam("")
        setUid("")

        toast.success("Task created")
        await getTodos.refetch()
      }
      await getTodos.refetch()

    }
  })
  const getTodos = api.todo.getTodos.useQuery()
  const updateTodo = api.todo.updateTodo.useMutation({
    onSuccess: async (res) => {
      getTodoOnId.mutate({ taskId: res.todoexist.id })
    }
  })
  const getTodoOnId = api.todo.getTodoOnId.useMutation({
    onSuccess: async (res) => {
      if (res.todo.done == true && res.todo?.GithubIssueNo !== null && res.todo.GithubIssueNo !== undefined) {
        setUTeamId(res.todo.groupId!)
        const data = await getGroupinfo.refetch()
        if (data.isFetched && data.data?.RepositoryLink !== null && data.data?.RepositoryLink !== undefined) {
          try {
            const info = linkParser(data.data?.RepositoryLink)
            const resaxios = await axios.post(`https://api.github.com/repos/${info.username}/${info.repository}/issues/${res.todo.GithubIssueNo}`, {
              "state": "closed",
            }, {
              headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
              }
            })
            if (resaxios.status >= 200 && resaxios.status <= 209) {
              toast.success("Closed the issue ")
              setUTeamId("")
            }
            else {
              console.log("issue close problem")
            }
          }
          catch (err) {
            console.log(err)
          }
        }
      }
      else if (res.todo.done == false && res.todo?.GithubIssueNo !== null && res.todo.GithubIssueNo !== undefined) {
        setUTeamId(res.todo.groupId!)
        const data = await getGroupinfo.refetch()
        if (data.isFetched) {
          try {
            const info = linkParser(data.data?.RepositoryLink)
            console.log("info", info)
            const resaxios = await axios.post(`https://api.github.com/repos/${info.username}/${info.repository}/issues/${res.todo.GithubIssueNo}`, {
              "state": "open",
            }, {
              headers: {
                "Accept": "application/vnd.github.v3+json",
                "Authorization": `Bearer ${retreiveGitToken.data?.githubAuthToken}`,
                "X-GitHub-Api-Version": "2022-11-28",
              }
            })
            if (resaxios.status >= 200 && resaxios.status <= 209) {
              toast.success("Created the issue ")
              setUTeamId("")
            }
            else {
              console.log("issue close problem")
            }
          }
          catch (err) {
            console.log(err)
          }
        }
        else {
          console.log("problem in getting group info")
        }
      }
    }
  })

  const updateIssueNo = api.todo.updateIssueNOOnId.useMutation();
  const retreiveGitToken = api.integration.GithubRetreiveToken.useQuery()
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const { mutate, isLoading } = api.openAI.taskCategorizer.useMutation({
    onSuccess(data) {
      const res = JSON.parse(data.response.text as string) as ResponseData
      setProjectType(res.Project_Type)
      setProjectTag(res.Project_Tag)
      console.log(res)
    },
  });

  const handleSubmit = async () => {
    try {
      if (title.length > 0 && groups.isFetched) {
        const myDate = new Date(date);
        const uniqueId = uuidv4()
        setUid(uniqueId)
        todo.mutate({ title, description, date: myDate || "", teamId: team, id: uniqueId, projectType: projectType, projectTag: projectTag })
      }
      else {
        toast.error("please enter a title ")
      }
    }
    catch (err) {
      console.log(err)
    }
    finally {
      handleOpen()
      console.log(title, description, date, team)
    }
  }


  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {
    setCheckedTasks((prevCheckedTasks: string[]) => {
      if (prevCheckedTasks.includes(taskId)) {
        return prevCheckedTasks.filter((id: string) => id !== taskId);
      } else {
        return [...prevCheckedTasks, taskId];
      }
    });

    if (e.target.checked) {
      updateTodo.mutate({ done: true, taskId })
    }
    else {
      updateTodo.mutate({ done: false, taskId })
    }
  };

  const handleai = async () => {
    console.log(title, description)
    if (title !== "" || description !== "") {
      mutate({ title: title, description: description })
    }
    else {
      setOpen(false)
      toast.error("Please enter a title and description ")
    }
  }


  useEffect(() => {
    const latestTodo = async () => {
      await getTodos.refetch()
    }
    void latestTodo()
  }, [todo.isSuccess, updateTodo.isSuccess])

  return (
    <div className="flex flex-col w-screen pt-3 px-16 h-screen overflow-auto">
      <div className="flex h-8 w-full flex-row items-center justify-between">
        <div className="flex flex-row ">
          <span>My Tasks</span>
          <div className="h-5/5 ml-4 w-4 rounded-md bg-gray-200 text-center">
            {getTodos.isFetched ? getTodos.data?.count : 0}
          </div>
        </div>
       {groups.isFetched && groups.data?.groups!== undefined && groups.data?.groups.length !== 0 ?  <Button placeholder={"rf"} onClick={() => { setProjectTag(""); setProjectType(""); handleOpen() }} className="w-30 h-8 bg-black text-white px-3 py-1 text-xs  rounded-md hover:bg-gray-900 mb ">Create Task</Button>:<><Tooltip content="create a team to create task"><Button placeholder={"rf"}  className="w-30 h-8 bg-gray-700 mb-2 text-white px-3 py-1 text-xs rounded-md  ">Create Task</Button></Tooltip></>}
        <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
          <DialogHeader placeholder={"rf"}><input type="text" onChange={(e) => {
            e.preventDefault()
            setTitle(e.target.value)
          }} className="w-full active:border-0 focus:border-0 outline-none  py-2 rounded pl-2" placeholder="Task title" required /></DialogHeader>
          <DialogBody className="py-0" placeholder={"rf"}>
            <Textarea label="Description" onChange={(e) => {
              e.preventDefault()
              setDescription(e.target.value)
            }} className="h-36 border  border-none bg-gray-100 outline-none placeholder:text-lg " />
            <div className="h-10 w-full flex flex-row justify-between items-center">
              {!isLoading ? <><div className="w-24">

                <Select placeholder={"rf"} value={projectType} className=" border-gray-200" onChange={(val) => { setProjectType(val!) }} label="Project">
                  <Option value="Web">Web</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="Cloud">Cloud</Option>
                  <Option value="Desktop">Desktop</Option>
                  <Option value="Server">Server</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </div>
                <div className="w-24">

                  <Select placeholder={"rf"} value={projectTag} className=" border-gray-200" onChange={(val) => { setProjectTag(val!) }} label="Tag">
                    <Option value="Bug">Bug</Option>
                    <Option value="Feature">Feature</Option>
                    <Option value="Improvement">Improvement</Option>
                    <Option value="Refactor">Refactor</Option>
                    <Option value="Other">Other</Option>

                  </Select>
                </div> </> : <>
                <div className=" w-52 h-full bg-gray-200 rounded-lg animate-pulse">
                </div>
                <div className=" w-52 h-full bg-gray-200 rounded-lg animate-pulse">
                </div>
              </>
              }



              <div className="mr-4 flex flex-row justify-center items-center p-1 rounded-2xl  hover:bg-gray-200 cursor-pointer" onClick={handleai}>

                {isLoading ? <>
                  <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24">
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-blue-500">
                    </path>
                  </svg></> : <>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rounded rounded-lgpointer" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </>}

              </div>
            </div>
          </DialogBody>


          <div className="flex flex-row justify-between  pb-7 px-3 mt-5 border-t-2 pt-5">

            <div className="flex flex-row w-4/5 justify-between">
              <div className="flex flex-row w-2/5 ">
                <Select size="md" className=" border-gray-200" onChange={(val) => { setTeam(val!) }} placeholder={"rf"} label="team">

                  {groups.isFetched ? groups.data?.groups?.map((grp) => {
                    return <Option key={grp.id} value={grp.id}>{grp.name}</Option>
                  }) : "...loading"}

                </Select>
              </div>
              <input type="date" onChange={(e) => { e.preventDefault(); setDate(e.target.value) }} className="border border-gray-200 px-1 ml-2 rounded rounded-md" />
            </div>

            <div className="flex flex-row">
              <Button
                placeholder={"rf"}
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1 ml-2"
              >
                <span>Cancel</span>
              </Button>
              <Button placeholder={"rf"} variant="gradient" color="black" className="ml-1" onClick={handleSubmit}>
                <span>Create</span>
              </Button>
            </div>
          </div>

        </Dialog>
      </div>

      {getTodos.isFetched && getTodos.data?.count === 0 ? <>
        <div className='w-full h-full bg-gray-200 rounded-md flex flex-row justify-center items-center'>
          <div className='w-1/5 h-1/12 text-center '>No Tasks Yet , Click create Task to create one</div>
        </div></> : <> <div className="flex h-fit flex-col">
          {getTodos.isFetched &&
            getTodos.data?.data.map((td) => {
              const GrpName = groups.data?.groups?.find((grp) => grp.id === td.groupid);
              return (
                <div
                  key={td.id} // Add a unique key to each task
                  className="w-full h-9 bg-gray-100 rounded-md mt-3 py-6 px-2 flex flex-column items-center justify-between my-3 "
                >
                  <div className="flex flex-row justify-center items-center ">
                    <input
                      type="checkbox"
                      className="w-5 h-5 ml-2 z-10"
                      checked={td.done}
                      onChange={(e) => { handleCheckboxChange(e, td.id).catch(err => console.log(err)) }}
                    />
                    &nbsp;
                    <span className={`ml-2 ${td.done ? "line-through" : ""}`}>
                      {td.title}
                    </span>
                    <Link href={`team/${td.id}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-5 w-4 h-4 hover:cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg></Link>

                  </div>

                  <div className="flex flex-row mr-2 font-bold">
                    <span className={`ml-2 ${td.done ? "line-through" : ""}`}>{td.date?.toDateString()}&nbsp;{td.date == null && null}{td.groupid == "" || null && null}{td.date !== null && td.groupid == null && null}{td.date == null && td.groupid == null && null}{td.date !== null && td.groupid !== null && "|"}<span>&nbsp;{GrpName?.name}</span></span>
                  </div>
                </div>
              );
            })}
        </div></>}

    </div>
  );
};


export default Index;
