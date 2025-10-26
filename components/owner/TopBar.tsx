"use client"

import { ReactNode, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import Image from "next/image";
import { BASE_IMAGE_PROFILE } from "@/global";
import { IUser } from "@/app/types";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

type ownerProps = {
//   children: ReactNode;
  id: string;
  title: string;
  user: IUser | null;
  search?: string;
  url?: string;
};

export default function Topbar({ id, title, user, search = "", url = "" }: ownerProps) {

      const [keyWord, setKeyWord] = useState<string>(search);
      const [username, setUserName] = useState<string>("");
      const router = useRouter();

      const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && url) router.push(`${url}?search=${keyWord}`)
        e.preventDefault()
      }

      useEffect(() => {
    const name = getCookie("name");
    if (name) {
      setUserName(name);
    }
  }, []);

    return (
      <header className="flex justify-between items-center px-6 py-11 bg-white rounded-bl-2xl rounded-tl-2xl stick top-0 z-30">
        {/* title (left side) */}
        <h1 className="text-4xl font-bold text-[#2B2D42]">{title}</h1>
        {/* end of title */}

        {/* Search + notification + profile (right side) */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-80">
            <CiSearch size={30} className="text-gray-500 mr-2"/>
            <input 
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm text-gray-700 w-full"
              onKeyUp={handleSearch}
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
            />
          </div>
          {/* end of search bar */}

          {/* profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image 
              src = {
                user?.profile
                  ? `${BASE_IMAGE_PROFILE}/${user.profile}`
                  : "/image/defautl.png"
              }
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-800">{username}</span>
          </div>
        </div>
      </header>





        // <header className="flex justify-between items-center px-6 py-11 bg-white rounded-bl-2xl rounded-tl-2xl sticky top-0 z-30">
        //     {/* search */}
        //     <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-80">
        //         <CiSearch size={30} className="text-gray-500 mr-2"/>
        //         <input 
        //             type="text"
        //             placeholder="Search..."
        //             className="bg-transparent outline-none text-sm text-gray-700 w-full"
        //             onKeyUp={handleSearch}
        //             value={keyWord}
        //             onChange={e => setKeyWord(e.target.value)}
        //         />
        //     </div>
        //     {/* end of search */}

        //     {/* profile + notification */}
        //     <div className="flex items-center gap-5">
        //         <FaBell className="text-gray-500 cursor-pointer" size={30}/>
        //         <div className="flex items-center gap-2 cursor-pointer">
        //             <Image 
        //                 src= {
        //                   user?.profile 
        //                     ? `${BASE_IMAGE_PROFILE}/${user.profile}` 
        //                     : "/image/defautl.png"
        //                 }
        //                 alt="Profile"
        //                 width={40}
        //                 height={40}
        //                 className="rounded-full"
        //             />
        //             <span className="text-sm font-medium text-gray-800">{username}</span>
        //         </div>
        //     </div>
        // </header>
    )
}