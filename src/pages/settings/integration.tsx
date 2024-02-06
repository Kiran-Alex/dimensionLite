import Layout from "~/components/Layout"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import Card from "~/components/Card"
import axios from "axios"
import { api } from "~/utils/api"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import toast from "react-hot-toast"
const Integration = () => {

    const [open, setOpen] = useState(false);
    const [token, setToken] = useState<string>("")
    const [VercelStatus, SetVercelStatus] = useState<boolean>(false)
    const handleOpen = () => setOpen(!open);

    const { mutate, data } = api.integration.TokenRegister.useMutation()
    const authToken = api.integration.RetreiveToken.useQuery()

    useEffect(() => {
        try {

            const VercelCheck = async () => {
                const Token = authToken.data?.vercelAuthToken
                try {
                    const result = await axios.get('https://api.vercel.com/v6/deployments', {
                        headers: {
                            Authorization: `Bearer ${Token}`
                        }
                    })

                    console.log(result)
                    if (result.status >= 200 && result.status <= 209) {
                        SetVercelStatus(true)
                    }
                    else {
                        SetVercelStatus(false)
                    }
                }

                catch (err) {
                    console.log(err)
                }
            }
            VercelCheck()
        }
        catch (err) {
            console.log(err)
        }
    }, [authToken])

    return (<>
        <Head>
            <title>Integration</title>
        </Head>
        <Layout>

            <div className="h-8 w-full flex flex-row items-center">
                <div className="flex items-center pl-3 overflow-x-auto whitespace-nowrap">
                    <Link href="/settings" className="text-black dark:text-black hover:underline text-sm pl-2 font-bold">
                        Settings
                    </Link>
                    <span className="mx-1 text-gray-500 dark:text-gray-300 rtl:-scale-x-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </span>

                    <a href="#" className="text-gray-500 dark:text-gray-400 font-bold text-sm hover:underline">
                        Integrations
                    </a>

                </div>
            </div>
            <div className="flex flex-grow pl-5 w-5/5 ">
                <div style={{ height: "34em" }} className=" mt-8 flex flex-col w-9/12  ">
                    <div className="h-fit w-5/5"><h1 className="text-gray-500 text-xl font-bold">Integrations</h1></div>
                    <Card image={<svg className="w-16 h-16 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2c-2.4 0-4.7.9-6.5 2.4a10.5 10.5 0 0 0-2 13.1A10 10 0 0 0 8.7 22c.5 0 .7-.2.7-.5v-2c-2.8.7-3.4-1.1-3.4-1.1-.1-.6-.5-1.2-1-1.5-1-.7 0-.7 0-.7a2 2 0 0 1 1.5 1.1 2.2 2.2 0 0 0 1.3 1 2 2 0 0 0 1.6-.1c0-.6.3-1 .7-1.4-2.2-.3-4.6-1.2-4.6-5 0-1.1.4-2 1-2.8a4 4 0 0 1 .2-2.7s.8-.3 2.7 1c1.6-.5 3.4-.5 5 0 2-1.3 2.8-1 2.8-1 .3.8.4 1.8 0 2.7a4 4 0 0 1 1 2.7c0 4-2.3 4.8-4.5 5a2.5 2.5 0 0 1 .7 2v2.8c0 .3.2.6.7.5a10 10 0 0 0 5.4-4.4 10.5 10.5 0 0 0-2.1-13.2A9.8 9.8 0 0 0 12 2Z" clipRule="evenodd" />
                    </svg>
                    } title="Github" connected={false} />


                    <button className="w-fit h-fit" onClick={ (e) =>{VercelStatus == true ? e.preventDefault()  :  handleOpen()}}>
                    <Card image={<svg fill="#000000" className="w-16 h-16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M256,48,496,464H16Z" /></svg>
                        } title="Vercel" connected={VercelStatus} /></button>
                    <Dialog placeholder={"fr"} open={open} handler={handleOpen}>
                        <DialogHeader placeholder={"fr"}>Vercel Integration</DialogHeader>
                        <DialogBody placeholder={"fr"}>
                            <Input label="enter access token" onChange={(e) => { e.preventDefault; setToken(e.target.value) }} crossOrigin={"fr"} />
                            <span className="text-xs mt-6 text-gray-600">You can Find It <a className="text-black underline" target="_blank" href="https://vercel.com/account/tokens">here</a> </span>
                        </DialogBody>
                        <DialogFooter placeholder={"fr"}>
                            <Button placeholder={"fr"}
                                variant="text"
                                color="red"
                                onClick={handleOpen}
                                className="mr-1"
                            >
                                <span>Close</span>
                            </Button>
                            <Button placeholder={"fr"} variant="gradient" color="green" onClick={async () => {

                                try {
                                    const result = await axios.get('https://api.vercel.com/v6/deployments', {
                                        headers: {
                                            Authorization: `Bearer ${token}`
                                        }
                                    })

                                    if (result.status >= 200 && result.status <= 209) {

                                        toast.success('Successfully Connected')
                                        SetVercelStatus(true);

                                        mutate(token)
                                        handleOpen()
                                    }
                                }
                                catch (err) {
                                    toast.error("Token Might be Wrong or Expired");
                                    handleOpen()
                                }
                            }}>
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </Dialog>

                </div>
            </div>
        </Layout>
    </>)
}

export default Integration