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
import { useState } from "react";
import { api } from "~/utils/api";


const Index = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const groups = api.profile.getGroups.useQuery()
  return (
    <Layout>
      <div className="flex h-8 w-full flex-row items-center justify-between">
        <div className="flex flex-row ">
          <span>My Tasks</span>
          <div className="h-5/5 ml-4 w-4 rounded-md bg-gray-200 text-center">
            0
          </div>
        </div>
        <Button placeholder={"rf"} onClick={() => handleOpen()} className="w-30 h-8 bg-black text-white px-3 py-1 text-xs  rounded-md hover:bg-gray-900">Create Task</Button>
        <Dialog placeholder={"rf"} open={open} handler={handleOpen}>
          <DialogHeader placeholder={"rf"}><input type="text" className="w-full active:border-0 focus:border-0 outline-none bg-gray-200 py-2 rounded pl-2" placeholder="Task title" /></DialogHeader>
          <DialogBody placeholder={"rf"}>
            <Textarea label="description" className="h-36 border-0 bg-gray-100" />
            
          </DialogBody>


          <div className="flex flex-row justify-between pb-7 px-3 mt-5">

            <div className="flex flex-row w-2/5">
              <Select size="md" className="bg-black text-white outline-none border-none placeholder:text-whi" placeholder={"rf"} label="team">

                {groups.isFetched ? groups.data?.groups?.map((grp) => {
                  return <Option key={grp.id}>{grp.name}</Option>
                }) : "...loading"}

              </Select>
            </div>

            <div className="flex flex-row">
              <Button
                placeholder={"rf"}
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button placeholder={"rf"} variant="gradient" color="black" className="ml-1" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            </div>
          </div>

        </Dialog>
      </div>
      <div className="flex flex-grow ">
        <div className="w-full h-9 bg-gray-100 rounded-md mt-3 flex flex-row items-center justify-between ">
          <div className="flex flex-row ">
            <input type="checkbox" className="w-5 h-5 ml-2 " />
            &nbsp;
            <span className="ml-2 max-w-fit line-through">Task 1</span>
          </div>
          <div className="flex flex-row mr-4">Jun 20</div>
        </div>
      </div>

    </Layout>
  );
};

export default Index;
