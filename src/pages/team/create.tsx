import Layout from "~/components/Layout";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SetStateAction } from "react";

type usershape = {
    name: string,
    id: string
}

const Create: React.FC = () => {
    const router = useRouter();
    // const currentRoute = router.pathname;
    const { data, isFetched } = api.token.serverToken.useQuery();
    const [users, setUsers] = useState<usershape[]>([])






    useEffect(() => {
        const res = async () => {

            try {
                if (isFetched == true) {
                    const result = await axios.get('https://api.cord.com/v1/users', {
                        headers: {
                            Authorization: `Bearer ${data?.token}`
                        }
                    })
                    if (result.status >= 200 && result.status <= 209) {


                        setUsers(result.data.users as SetStateAction<usershape[]>);

                        // console.log(result.data.users)

                    }
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        res()
    }, [isFetched])


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
                            <input type="text" placeholder="Dictator" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-300 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-300  dark:text-gray-300 dark:focus:border-blue-300 mb-4" />
                            <Select placeholder={"rf"} label="Add Members" className="border-gray-200">
                                {users.map((user) => {
                                    return <Option value={user.id} key={user.id}>{user.name}</Option>
                                })}
                            </Select>
                            <label className="block text-sm text-gray-400 mt-4">Tip :- You can add members later via group code</label>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 w-24 self-end">Create</button>
                    </div>
                </div>

            </Layout>
        </>
    );
};

export default Create;
