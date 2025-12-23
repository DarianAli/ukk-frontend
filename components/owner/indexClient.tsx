"use client"

import { ReactNode, useState } from "react"
import Sidebar from "./sideBar"
import Topbar from "./TopBar"
import { IKos, IUser } from "@/app/types"


type SideType = {
    id: string;
    icon: ReactNode;
    label: string;
    path: string;
};

type Props = {
    children: ReactNode;
    id: string;
    title: string;
    sideList: SideType[];
    user: IUser | null;
    kosList: IKos[];
}

export default function OwnerLayoutClient({children, id, title, sideList, user, kosList}: Props) {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar brow */}
            <Sidebar 
                isOpen={sideBarOpen}
                sideList={sideList}
                title={title}
                id={id}
                user={user}
                onClose={() => setSideBarOpen(false)}
            />

            {/* main content */}
            <div className="lg:pl-28 sidebar-transition">
                <Topbar 
                    id={id}
                    title={title}
                    user={user}
                    onMenuClick={() => setSideBarOpen(true)}
                />

                <main className="p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}