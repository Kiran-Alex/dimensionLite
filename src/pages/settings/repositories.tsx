import Layout from "~/components/Layout"
import Link from "next/link"
import RepoCard from "~/components/RepoCard"
import axios from "axios"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"
import { AxiosResponse } from "axios"

type ds = {
  map(arg0: (dat: dataShape) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>,
}

interface dataShape extends AxiosResponse {
  status: number,
  data: ds,
  id: number,
  name: string,
  language: string,
  open_issues_count: number,
  updated_at: Date,
  fork: boolean
}


const Repositories = () => {
  const [data, setData] = useState<ds>()
  const getGitToken = api.integration.GithubRetreiveToken.useQuery()

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res: dataShape = await axios.get("https://api.github.com/users/Kiran-Alex/repos", {
          headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${getGitToken.data?.githubAuthToken}`,
            "X-GitHub-Api-Version": "2022-11-28"
          }
        })
        if (res.status >= 200 && res.status <= 209) {
          console.log(res.data)
          setData(res.data) // Set array of repositories
        }
        else {
          console.log("Request is not Successful " + res.status)
        }
      }
      catch (err) {
        console.log(err)
      }
    }

    void fetchRepos()

  }, [getGitToken.isFetched])

  return (
    <Layout>
      <div className="h-8 w-full flex flex-row items-center">
        <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
          <Link href="/settings" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
            Settings
          </Link>
          <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </span>

          <a href="#" className="text-gray-500 dark:text-gray-400 font-bold text-sm hover:underline">
            Repositories
          </a>

        </div>
      </div>
      <div className="flex flex-grow pl-5 w-5/5 flex-row justify-center h-48 overflow-y-scroll ">
        <div className=" h-fit w-3/5 py-3 px-3  flex-column ">
          <span className="w-5/5 flex justify-center items-center">Repos We Have Access to &nbsp;&nbsp; <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
          </span> </span>
          {getGitToken.isError && <div className="text-red-500 dark:text-red-400">Please integrate Github to access this feature</div>}
          {getGitToken.isLoading && <div className="text-gray-500 dark:text-gray-400">Loading...</div>}
          {data?.map((dt) => {
            console.log(dt)
            return (
              <div key={dt.id} className="h-fit">
                <RepoCard repoName={dt.name} date={dt.updated_at} language={dt.language} issues={dt.open_issues_count} fork={dt.fork} />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Repositories