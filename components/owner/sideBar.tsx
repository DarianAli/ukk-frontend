"use client";

import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import SideBarItem from "./SideBarItem"
import { getCookie, removeCookie } from "@/lib/client-cookies";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/app/types";
import { BASE_IMAGE_PROFILE } from "@/global";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import path from "path";
import { FaUser } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { X } from "lucide-react"

type sideType = {
  id: string;
  icon: ReactNode;
  label: string;
  path: string;
};

type ownerProps = {
  // children: ReactNode;
  id: string;
  title: string;
  user: IUser | null;
  sideList: sideType[];
  isOpen: boolean;
  onClose: () => void;

};

const menuItems = [
  { label: "Dashboard", icon: <FaHome size={22}/>, path: "/owner/dashboard" },
  { label: "User", icon: <FaUser size={22}/>, path: "/owner/user" },
  { label: "Kos", icon: <FaBuildingUser size={22}/>, path: "/owner/kos" },
  { label: "Booking", icon: <TbBrandBooking size={22}/>, path: "/owner/booking" }
]

export default function Sidebar({ id, title, user, sideList, isOpen, onClose }: ownerProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("role");
    removeCookie("name");
    removeCookie("idUser");
    router.push("/login");
  }

return (
  <>
    {/* Mobile Overlay */}
    <div
      className={cn(
        "fixed inset-0 bg-black/40 z-40 lg:hidden sidebar-transition",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    />

  {/* Sidebar */}
  <aside className={cn(
    "fixed left-0 top-0 h-screen w-28 bg-[#4E635E] text-white",
    "flex flex-col items-center justify-between py-6 pt-10 pb-10",
    "rounded-r-3xl z-50 transition-transform duration-300 shadow-lg",
    // Mobile: slide in n out
    "lg:translate-x-0",
    isOpen ? "translate-x-0" : "-translate-x-full"
  )}
  >
    {/* close button */}
    <button
      onClick={onClose}
      className="absolute top-4 right-4 lg:hidden text-white-muted hover:text-white transition-colors"
    >
      <X size={20}/>
    </button>

    {/* logo section */}
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl bg-white flex items-center justify-center w-12 h-12 shadow-md">
        <Image src="/image/logoHunterss.png" alt="logo" width={50} height={50} className="rounded-xl"/>
      </div>
    </div>
    {/* end of logo section */}

    {/* menu navi section */}
     <nav className="flex flex-col gap-16 mt-32 flex-1 items-center">
        {menuItems.map((item) => {
          const isActive = pathname === item.path; // deteksi halaman aktif

          return (
            <Link
              href={item.path}
              key={item.label}
              onClick={onClose}
              className={cn(
                "relative text-white-muted hover:text-white transition-colors group",
                isActive && "text-white"
              )}
            >
              {/* Icon */}
              <div className="flex items-center justify-center relative">
                {item.icon}

                {/* Border kanan indikator aktif */}
                {isActive && (
                  <span className="absolute right-[-20px] top-1/2 -translate-y-1/2 h-6 w-1 bg-white rounded-full"></span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    {/* end of nav section */}

    {/* tombol logout */}
    <button
      onClick={handleLogout}
      className="text-[#E2E0C8] hover:text-red-400 transition-colors"
      title="Logout"
    >
      <IoLogOut size={22}/>
    </button>
  </aside>
  </>
)
}

