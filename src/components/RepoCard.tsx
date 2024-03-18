import React from 'react'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);


type propsSchema = {
    repoName: string,
    date: Date,
    language: string,
    issues: string | number,
    fork: boolean
}

const RepoCard: React.FC<propsSchema> = ({ repoName, date, language, issues,fork }) => {
    return (
        <>
            <div className=" w-5/5 h-52 my-4 bg-gray-100 rounded-xl border-gray-300 border-2 p-4 ">
                <div className="w-full h-24  flex flex-row items-center justify-between border-b-2 border-gray-300">
                    <div className='flex flex-col'>
                 
                        <span className='text-gray-500'>repo name</span>
                        <div className='flex items-center'>  
                        <span className="text-black font-bold text-xl">{repoName}</span>
                      {fork == true &&  <span className='font-bold text-sm ml-2 text-gray-500'>( forked )</span>}
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <span className='text-gray-500'>updated</span>
                        <span className="text-black font-bold text-lg">{dayjs(date).fromNow()}</span>
                    </div>
                </div>
                <div className="w-full h-24  flex flex-row items-center justify-between">
                    <div className='flex flex-col'>
                        <span className='text-gray-500'>language</span>
                        <span className="text-black font-bold text-xl">{language || "NA"}</span>
                    </div>
                    
                    <span className="text-black font-bold text-xl flex flex-row items-center"><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-issue-opened UnderlineNav-octicon d-none d-sm-inline bg-white">
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                    </svg>&nbsp;&nbsp;Open Issues {issues}</span>
                    <span className="text-black font-bold text-xl">Pull Requests</span>
                </div>
            </div>
        </>
    )
}

export default RepoCard