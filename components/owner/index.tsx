import { ReactNode } from "react";
import Sidebar from "./sideBar";
import { BASE_API_URL } from "@/global";
import { getCookies } from "@/lib/server-cookie";
import { IUser } from "@/app/types";
import { get } from "@/lib/api-bridge";
import Topbar from "./TopBar";

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
}

const getUSer = async (): Promise<IUser | null> => {
    try {
        const TOKEN = await getCookies("token")
        const url = `${BASE_API_URL}/user/get`
        const { data } = await get(url, TOKEN);

        if(data?.status) return data.data;
        console.log(data)
        return null
    }catch (error) {
        console.log (error)
        return null
    }
}

const OwnerTemplate = async ({ children, id, title, sideList }: ownerProps) => {
    const profile : IUser | null = await getUSer()

    return (
         <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar (fixed) */}
      <Sidebar sideList={sideList} title={title} id={id} user={profile} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 ml-28 h-full">
        <Topbar id={id} title={title} user={profile} />
        <main className="flex-1 bg-white p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
    )
}

export default OwnerTemplate