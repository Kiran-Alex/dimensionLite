import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Select, Option, Checkbox, Alert, Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { ReactElement, JSXElementConstructor } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import Link from "next/link";
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
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [grppID, setGrppID] = useState<string>()
  // const currentRoute = router.pathname;
  const { data, isFetched } = api.token.serverToken.useQuery();
  const [users, setUsers] = useState<usershape[]>([]);
  const [repo, setRepo] = useState<string>("")
  const [teamName, SetteamName] = useState<string>("")
  const username = api.profile.username.useQuery();
  const info = api.profile.info.useQuery()
  const getGitToken = api.integration.GithubRetreiveToken.useQuery()
  const createGroupandUser = api.group.CreateUserandGroup.useMutation({ onSuccess: () => { setOpen(true) } })



  useEffect(() => {
    const res = async () => {
      console.log(getGitToken.data?.githubAuthToken == null)

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
    if (info.isFetched) {
      const createUserAndGroup = async () => {

        const grpID = uuidv4()
        setGrppID(grpID)

        const userCreateRes = await axios.put(`https://api.cord.com/v1/users/${info.data?.info.id}`, {
          "name": username.data?.username,
        }, {
          headers: {
            Authorization: `Bearer ${data?.token}`
          }
        }).then(async (res) => {
          const creategroupres = await axios.put(`https://api.cord.com/v1/groups/${grpID}`, {
            name: teamName,
            members: [info.data?.info.id]
          }, {
            headers: {
              Authorization: `Bearer ${data?.token}`
            }
          })
          if (creategroupres.status >= 200 && creategroupres.status <= 209 && res.status >= 200 && res.status <= 209) {
            toast.success("Group Created")
            createGroupandUser.mutate({ groupId: grpID, groupName: teamName, repoLink: repo })
            console.log(res.data, creategroupres.data)
          }
          else {
            toast.error("Group Creation Failed")
          }
        }).then(async (res) => {

          const addUserToGroup = await axios.post(`https://api.cord.com/v1/groups/${grpID}/members`, {
            add: [info.data?.info.id]
          }, {
            headers: {
              Authorization: `Bearer ${data?.token}`
            }
          })

          if(addUserToGroup.status >= 200 && addUserToGroup.status <= 209){
            toast.success("User Added to Group")
          }

        })

        userCreateRes


      }

      await createUserAndGroup()
    }
  }

  console.log(getGitToken.data?.githubAuthToken)

  return (
    <>
      <Layout >
        {/* {currentRoute} */}

        <div className="h-8 w-full flex flex-row items-center">
          Create
        </div>
        <div className="flex flex-grow justify-center items-center">
          <div className="lg:md:w-2/4 w-3/4 h-3/4 flex flex-col justify-between  rounded-lg">
            <div className="flex flex-col">
              <label className="block text-sm text-gray-500 dark:text-gray-600">Team Name <span className="text-red-400 align-center font-bold ">*</span></label>
              <input onChange={(e) => { e.preventDefault(); SetteamName(e.target.value) }} type="text" placeholder="Dictator" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4" required />

              <label className="block text-sm text-gray-500 dark:text-gray-600">Link Repo </label>

              {getGitToken.isFetched && getGitToken.data?.githubAuthToken !== undefined && getGitToken.data?.githubAuthToken !== null &&
                <input onChange={(e) => { e.preventDefault(); setRepo(e.target.value) }} type="text" placeholder="https://github.com/facebook/react" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4" />}
              {getGitToken.isFetched && getGitToken.data?.githubAuthToken == undefined && getGitToken.data?.githubAuthToken == null && <>
                <input type="text" placeholder="https://github.com/facebook/react" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4 cursor-not-allowed" disabled />
              </>
              }
              {getGitToken.isLoading && <div className="block h-11  mt-2 w-full placeholder-gray-400/70  animate-pulse dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4 cursor-not-allowed"  ></div>}


              <label className="block text-sm text-gray-400 mt-1">Tip : You can add members later via group code</label>
              <label className="block text-sm text-gray-400 mt-1 tracking-wide">Note : Integrate your github in <Link className="text-gray-500 underline underline-offset-2" href={"/settings/integration"}>settings</Link> to Link a Repository</label>
            </div>

            <Alert
              className="w-12/12 h-4 flex flex-row justify-center items-center px-0"
              variant="gradient"
              open={open}
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              }
              action={
                <Button
                  placeholder={"rf"}
                  variant="text"
                  color="white"
                  size="sm"
                  className="!absolute right-3 bg-white text-black  text-center h-6 hover:bg-gray-200"
                  onClick={async () => {
                    await copy(grppID!);
                    setCopied(true);
                  }}
                >
                  {copied ? "Copied" : "Copy"}

                </Button>
              }
            >
              <span className="text-sm">Group Code : &nbsp; {grppID} &nbsp;&nbsp;</span>
            </Alert>


            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-24 self-end" onClick={async () => { await handleSubmit() }}>Create</button>
          </div>
        </div>

      </Layout>
    </>
  );
};

export default Create;
