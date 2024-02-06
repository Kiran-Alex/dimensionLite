import Layout from "~/components/Layout"
import axios, { AxiosResponse } from "axios";
import { api } from "~/utils/api"
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useEffect, useState } from "react"

interface resultshape extends AxiosResponse {
  status : number,
  data : {
    user : {username : string},
    projects : dataShape
  }
}

type dataShape = {
  map(arg0: (dat: dataShape) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
  length: number; name: string, id: string, latestDeployments: Array<{ alias: Array<string>, readyState: string | Array<string> }> 
};
const Index = () => {
  const [data, setData] = useState<dataShape>()
  const [username, setUsername] = useState<string>()
  const Verceltoken = api.integration.RetreiveToken.useQuery()

  useEffect(() => {
    if (Verceltoken.isFetched) {
      try {
        const Token = Verceltoken.data?.vercelAuthToken
        const res = async () => {
          try {
            const result:resultshape = await axios.get('https://api.vercel.com/v9/projects', {
              headers: {
                Authorization: `Bearer ${Token}`
              }
            })
            if (result.status >= 200 && result.status <= 209) {
              setData(result.data.projects)
            }

          }
          catch (err) {
            console.log(err)
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        res()

        const getUsername = async () => {
          try {
            const response:resultshape = await axios.get("https://api.vercel.com/v2/user", {
              headers: {
                Authorization: `Bearer ${Token}`
              }
            })
            if (response.status >= 200 && response.status <= 209) {
              setUsername(response.data.user.username)
            }
          }
          catch (err) {
            console.log(err)
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getUsername()
      }
      catch (err) {
        console.log(err)
      }
    }
  }, [Verceltoken.isFetched])

  if (Verceltoken.isFetched) {
    if (data !== undefined) {
      console.log(data)
      console.log("len", data.length)
      if (data.length == 0) {
        return <p>No Deployments</p>
      }
    }
  }

  return (
    <>

      <Layout>
        <style jsx global>{`
      .sidebar-2 {
         display: none ;
           }
        `}</style>

        <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
          <h1 className="font-bold"> Deployments</h1>
        </div>

        <div className="flex flex-grow justify-between flex-col ">
          <div className="w-5/5 h-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-3">
            {
              Verceltoken.isLoading && (<>
                <Link href={``} className="w-27 h-40  border border-gray-300 p-3 flex flex-col justify-between animate-pulse bg-gray-400 rounded-lg">
                  <div>
                    <div className="text-black font-bold "></div>

                  </div>

                  <p className={"self-end p-3 py-0 rounded-xl bg-green-200 text-sm animate-pulse "}></p>
                </Link>

                <Link href={``} className="w-27 h-40  border border-gray-300 p-3 flex flex-col justify-between animate-pulse bg-gray-400 rounded-lg">
                  <div>
                    <div className="text-black font-bold "></div>

                  </div>

                  <p className={"self-end p-3 py-0 rounded-xl bg-green-200 text-sm animate-pulse "}></p>
                </Link>


                <Link href={``} className="w-27 h-40  border border-gray-300 p-3 flex flex-col justify-between animate-pulse bg-gray-400 rounded-lg">
                  <div>
                    <div className="text-black font-bold "></div>

                  </div>

                  <p className={"self-end p-3 py-0 rounded-xl bg-green-200 text-sm animate-pulse "}></p>
                </Link>



              </>




              )
            }
            {

              Verceltoken.isFetched && data !== undefined && data.map((dat:dataShape) => {

                console.log("gfyu ", dat)

                return (<Link href={`https://vercel.com/${username}/${dat.name}/deployments`} target="_blank" key={dat.id} className="w-27 h-40  border border-gray-300 p-3 flex flex-col justify-between hover:bg-gray-50">
                  <div>
                    <div className="text-black font-bold"> {dat.name} </div>
                    <Link target="_blank" href={`https://${dat.latestDeployments[0]?.alias[0]}`} className="text-gray-400 text-sm hover:underline underline-offset-2"  >{dat.latestDeployments[0]?.alias[0]}</Link>
                  </div>

                  <p className={dat.latestDeployments[0]?.readyState[0] === "R" ? "self-end p-3 py-0 rounded-xl bg-green-200 text-sm" : "self-end p-3 py-0 rounded-xl text-sm bg-red-200"}>{dat.latestDeployments[0]?.readyState[0] === "R" ? "Ready" : "Error"}</p>
                </Link>)
              })


            }

          </div>
        </div>
      </Layout>
    </>
  )
}

export default Index