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
};

const menuItems = [
  { label: "Dashboard", icon: <FaHome size={22}/>, path: "/owner/dashboard" },
  { label: "User", icon: <FaUser size={22}/>, path: "/owner/user" },
  { label: "Kos", icon: <FaBuildingUser size={22}/>, path: "/owner/kos" },
  { label: "Booking", icon: <TbBrandBooking size={22}/>, path: "/owner/booking" }
]

export default function Sidebar({ id, title, user, sideList }: ownerProps) {
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
  <aside className="fixed left-0 top-0 h-screen w-28 bg-[#4E635E] text-white flex flex-col items-center justify-between py-6 pt-10 pb-10 rounded-r-3xl">
    {/* logo section */}
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-xl bg-white flex items-center justify-center">
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
              className={`relative text-[#E2E0C8] hover:text-white transition-colors 
                ${isActive ? "text-white font-semibold" : ""}`}
              title={item.label}
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
)
}

// const Sidebar = ({ children, id, title, user, sideList }: ownerProps) => {
//   const [isShow, setIsShow] = useState<boolean>(false);
//   const [username, setUserName] = useState<string>("");
//   const [isDropdown, setIsDropdown] = useState(false);
//   const toggleDropdown = () => setIsDropdown(!isDropdown);

//   useEffect(() => {
//     const name = getCookie("name");
//     if (name) {
//       setUserName(name);
//     }
//   }, []);

//   const router = useRouter();

//   const handleLogout = () => {
//     removeCookie("token");
//     removeCookie("role");
//     removeCookie("name");
//     removeCookie("idUser");
//     router.push("/login");
//   };

//   return (
//     <div>
//       <header className="flex justify-between items-center p-4 mb-0">
//         <div className="flex gap-2">
//           <button onClick={() => setIsShow(true)}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6 text-black"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m16.5 4.5h16.5"
//               />
//             </svg>
//           </button>
//           <h1 className="fond-bold text-xl text-black">{title}</h1>
//         </div>

//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center space-x-2"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 
//                 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-
//                 2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
//               />
//             </svg>
//             <span className="font-bold text-black">Option</span>
//           </button>
//           {isDropdown && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
//               <Link
//                 href="#"
//                 className="block px-4 py-2 text-sm text-sky-900 hover:bg-black"
//               >
//                 profile
//               </Link>
//               < Link
//                 href="#"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-black"
//               >
//                 Setting
//               </Link>
//               <Link
//                 href="#"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-black"
//               >
//                 <button 
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </header>
//       {/* end of header section */}

//       {/* content section */}
//       <div className="min-h-screen w-full overflow-hidden">
//         {children}
//       </div>
//       {/* end of content section */}

//       {/* sidebar section */}
//       <div className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-300 shadow-md transform transition-transform duration-300 ease-in-out z-50 ${isShow ? "translate-x-0" : "-translate-x-full"}`} >
//         {/* close button */}
//         <div className="ml-auto p-2">
//           <button onClick={() => setIsShow(false)}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-8 h-8"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//               />
//             </svg>
//           </button>
//         </div>
//         {/* end of close button */}

//         {/* logo section */}
//         <div className="mb-3 w-full flex justify-center">
//           <div className="flex items-center space-x-2">
//             <h1 className="text-2xl font-bold text-slate-500">
//               Kos Hunter
//             </h1>
//           </div>
//         </div>
//         {/* end of logo section */}

//         {/* user section */}
//         <div className="w-full mt-10 mb-6 text-black px-4 py-2 flex gap-2 items-center">
//           <Image
//             src={user?.profile ? `${BASE_IMAGE_PROFILE}/${user.profile}` : "/image/default.png"}
//             alt="Profile"
//             width={40}
//             height={40}
//             className="rounded-full"
//           />
//           <div className="text-xl font-semibold">
//             <span className="text-slate-500">{username}</span>
//           </div>
//         </div>
//         {/* end of user section */}

//         {/* menu section */}
//         <div className="w-full p-2 overflow-y-auto">
//           <div className="px-5">
//             {sideList.map((side, index) => (
//               <SideBarItem
//                 icon={side.icon}
//                 label={side.label}
//                 path={side.path}
//                 active={side.id === id}
//                 key={`keySide${index}`}
//               />
//             ))}
//           </div>
//         </div>
//         {/* end of menu section */}

//         {/* end of sidebar section*/}
//       </div>
//     </div>
//   );
// };

// export default Sidebar