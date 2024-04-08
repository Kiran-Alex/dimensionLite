import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Join: React.FC = () => {
    const token = api.token.serverToken.useQuery();
    const profile = api.profile.info.useQuery();
    const JoinGroup =  api.group.Join.useMutation();
    const [groupfield, SetGroupField] = useState<string>();
    const getgrouponid = api.group.GetGroupOnId.useQuery({groupId : groupfield!})


    const handleSubmit = () => {
        const addUser = async () => {
            try {
                if (groupfield !== undefined) {
                    const res = await axios.post(`https://api.cord.com/v1/groups/${groupfield}/members`, {
                        "add": [`${profile.data?.info.id}`]
                    }, {
                        headers: {
                            Authorization: `Bearer ${token.data?.token}`
                        }
                    })
                    try {
                        if (res.status <= 200 && res.status <= 209) {
                            if(getgrouponid.data){
                            toast.success("successfully joined the group")
                            JoinGroup.mutate(groupfield)}
                        }
                        else {
                            toast.error("Please Check The Code Again")
                        }
                    }
                    catch (err) {
                        console.log(err)
                        toast.error("Please Check The Code ")
                    }
                }
                else {
                    toast.error("Please enter the Group Code")
                }

            }
            catch (err) {
                toast.error("Please Check The Code or try again later")
            }
        }

        addUser().catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <Layout >
                {/* {currentRoute} */}

                <div className="h-8 w-full flex flex-row items-center">
                    Join Team
                </div>
                <div className="flex flex-grow justify-center items-center">
                    <div className="w-2/4 h-1/4 flex flex-col justify-between  rounded-lg">
                        <div className="flex flex-col">
                            <label className="block text-sm text-gray-500 dark:text-gray-600">Enter Group Code to Join</label>
                            <input type="text" onChange={(e) => { e.preventDefault(), SetGroupField(e.target.value) }} placeholder="a3hg-yt5z-hdjk-ew23" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4" />
                        </div>
                        <button onClick={() => { handleSubmit() }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-24 self-end">Create</button>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Join;
