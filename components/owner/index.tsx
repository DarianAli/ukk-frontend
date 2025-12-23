
import { ReactNode } from "react";
import Sidebar from "./sideBar";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/server-cookie";
import { IKos, IUser } from "@/app/types";
import { get } from "@/lib/api-bridge";
import Topbar from "./TopBar";
import OwnerLayoutClient from "./indexClient";

type sideType = {
    id: string,
    icon: ReactNode,
    label: string,
    path: string
}



type ownerProps = {
    children: ReactNode,
    id: string,
    title: string,
    sideList: sideType[]
    search?: string;
    url?: string;
    user?: IUser | null
}

const getUSer = async (): Promise<IUser | null> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/user/profile`
        const { data } = await get(url, TOKEN);

        if(data?.status) return data.data;
        console.log(data)
        return null
    }catch (error) {
        console.log (error)
        return null
    }
}

const getKos = async (): Promise<IKos[] | null> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/kos/get`
        const { data } = await get(url, TOKEN)

        if(data?.status) return data.data
        console.log(data)
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}

const OwnerTemplate = async ({ children, id, title, sideList, user }: ownerProps) => {
    const profile : IUser | null = await getUSer()
    const kosData : IKos[] | null = await getKos()

    return (
     <OwnerLayoutClient
        id={id}
        title={title}
        sideList={sideList}
        user={profile}
        kosList={kosData ?? []}
     >
        {children}
     </OwnerLayoutClient>
    )
}

export default OwnerTemplate