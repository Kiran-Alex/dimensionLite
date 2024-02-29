import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Select, Option, Checkbox } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { ReactElement, JSXElementConstructor } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
type usershape = {
  name: string,
  id: string
}
interface resultshape extends AxiosResponse {
  status: number,
  data: {
    user: { username: string },
    users: usershape[]
  }
}
const Create: React.FC = () => {
  const router = useRouter();
  // const currentRoute = router.pathname;
  const { data, isFetched } = api.token.serverToken.useQuery();
  const [users, setUsers] = useState<usershape[]>([]);
  const [teamName, SetteamName] = useState<string>()
  const username = api.profile.username.useQuery();
  const info = api.profile.info.useQuery()
  const createuser = api.profile.Create.useQuery()
  const createGroup  = api.group.Create.useMutation()
  

  useEffect(() => {
    const res = async () => {

      try {
        if (isFetched == true) {
          const result: resultshape = await axios.get('https://api.cord.com/v1/users', {
            headers: {
              Authorization: `Bearer ${data?.token}`
            }
          })
          if (result.status >= 200 && result.status <= 209) {


            setUsers(result.data.users);

            // console.log(result.data.users)

          }
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    res()
  }, [isFetched])

  const handleSubmit = async () => {
    console.log("clicked")
    const CreateUser = async () => {
      const res = await axios.put(`https://api.cord.com/v1/users/${info.data?.info.id}`, {
        "name": username.data?.username,
      }, {
        headers: {
          Authorization: `Bearer ${data?.token}`
        }
      })
      try {
        if (res.status <= 200 && res.status <= 209) {
          console.log("user created")

        }
        else {
          toast.error("something went wrong please try again later ... ")
        }
      }
      catch (err) {
        console.log(err)
      }
    }

    const CreateGroup = async () => {
      const grpID = uuidv4()
      const res = await axios.put(`https://api.cord.com/v1/groups/${grpID}`, {
        name: teamName,
      }, {
        headers: {
          Authorization: `Bearer ${data?.token}`
        }
      })
      try {
        if (res.status <= 200 && res.status <= 209) {
          
          createGroup.mutate({
            groupId : grpID,
            groupName : teamName!
          })

          toast.success("Group Created")
        }
        else {
          toast.error("something went wrong please try again later ... ")
        }
      }
      catch (err) {
        console.log(err)
      }
    }
   // eslint-disable-next-line @typescript-eslint/no-floating-promises
    CreateUser()
     // eslint-disable-next-line @typescript-eslint/no-floating-promises
    CreateGroup()
  }

  return (
    <>
      <Layout >
        {/* {currentRoute} */}

        <div className="h-8 w-full flex flex-row items-center">
          Create
        </div>
        <div className="flex flex-grow justify-center items-center">
          <div className="w-2/4 h-3/4 flex flex-col justify-between  rounded-lg">
            <div className="flex flex-col">
              <label className="block text-sm text-gray-500 dark:text-gray-600">Team Name <span className="text-red-400 align-center font-bold ">*</span></label>
              <input onChange={(e) => { e.preventDefault(); SetteamName(e.target.value) }} type="text" placeholder="Dictator" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4" />
              <Select placeholder={"rf"} label="Add Members" className="border-gray-200" selected={(val: ReactElement<{ name: string }> | undefined) => {
                return val?.props.name
              }} >
                {users.map((user) => {
                  return <Checkbox crossOrigin="true" key={user.id} value={user.id} label={user.name} color="blue" onSelect={(val) => {
                    return val
                  }} />
                })}

              </Select>
              <label className="block text-sm text-gray-400 mt-4">Tip :- You can add members later via group code</label>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-24 self-end" onClick={async() => { await handleSubmit() }}>Create</button>
          </div>
        </div>

      </Layout>
    </>
  );
};

export default Create;
