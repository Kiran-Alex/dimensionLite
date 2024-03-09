import Layout from "~/components/Layout";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast";


const Index = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [team, setTeam] = useState<string>("")
  const handleOpen = () => setOpen(!open);
  const groups = api.profile.getGroups.useQuery()
  const todo = api.todo.create.useMutation()
  const getTodos = api.todo.getTodos.useQuery()
  const updateTodo = api.todo.updateTodo.useMutation()
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);



  const handleSubmit = async () => {
    try {
      if (title.length > 0 && groups.isFetched) {
        const myDate = new Date(date);
        todo.mutate({ title, description, date: myDate, teamId: team, id: uuidv4() })

        if (todo.isSuccess) {
          await getTodos.refetch()
          console.log('Updated Todos:', getTodos.data);
          setTitle("")
          setDescription("")
          setDate("")
          setTeam("")

          toast.success("Task created")
        }

      }
      else {
        toast.error("please enter a title ")
      }
    }
    catch (err) {
      console.log(err)
    }
    console.log(title, description, date, team)
    handleOpen()
  }


  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, taskId: string): void => {
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


  useEffect(() => {
    const latestTodo = async () => {
      await getTodos.refetch()
    }
    void latestTodo()
  }, [todo.isSuccess, updateTodo.isSuccess])



  return (
    <Layout>
      <div className="flex h-8 w-full flex-row items-center justify-between">
        <div className="flex flex-row ">
          <span>My Tasks</span>
          <div className="h-5/5 ml-4 w-4 rounded-md bg-gray-200 text-center">
            {getTodos.isFetched ? getTodos.data?.count : 0}
          </div>
        </div>
        <Button placeholder={"rf"} onClick={() => handleOpen()} className="w-30 h-8 bg-black text-white px-3 py-1 text-xs  rounded-md hover:bg-gray-900 mb ">Create Task</Button>
        <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
          <DialogHeader placeholder={"rf"}><input type="text" onChange={(e) => {
            e.preventDefault()
            setTitle(e.target.value)
          }} className="w-full active:border-0 focus:border-0 outline-none bg-gray-200 py-2 rounded pl-2" placeholder="Task title" /></DialogHeader>
          <DialogBody placeholder={"rf"}>
            <Textarea label="description" onChange={(e) => {
              e.preventDefault()
              setDescription(e.target.value)
            }} className="h-36 border-0 bg-gray-100" />

          </DialogBody>


          <div className="flex flex-row justify-between pb-7 px-3 mt-5">

            <div className="flex flex-row w-4/5 justify-between">
              <div className="flex flex-row w-2/5 ">
                <Select size="md" className=" " onChange={(val) => { setTeam(val!) }} placeholder={"rf"} label="team">

                  {groups.isFetched ? groups.data?.groups?.map((grp) => {
                    return <Option key={grp.id} value={grp.id}>{grp.name}</Option>
                  }) : "...loading"}

                </Select>
              </div>
              <input type="date" onChange={(e) => { e.preventDefault(); setDate(e.target.value) }} className="border border-gray-400 px-1 ml-2 rounded rounded-md" />
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
        </div></>:<> <div className="flex flex-grow flex-col">
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
                    className="w-5 h-5 ml-2"
                    checked={checkedTasks.includes(td.id)}
                    onChange={(e) => { handleCheckboxChange(e, td.id) }}
                  />
                  &nbsp;
                  <span className={`ml-2 ${checkedTasks.includes(td.id) ? "line-through" : ""}`}>
                    {td.title}
                  </span>
                </div>

                <div className="flex flex-row mr-2 font-bold">
                 <span className={`ml-2 ${checkedTasks.includes(td.id) ? "line-through" : ""}`}>{td.date?.toDateString()}&nbsp;{td.date==null  &&  null  }{ td.groupid== ""||null && null}{td.date!==null && td.groupid == null && null}{td.date==null && td.groupid == null && null}{td.date!==null && td.groupid !== null && "|"}<span>&nbsp;{GrpName?.name}</span></span> 
                </div>
              </div>
            );
          })}
      </div></>}
     
    </Layout>
  );
};


export default Index;
