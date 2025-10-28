"use client";

import { ReactNode, useState, useEffect, KeyboardEvent } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { IUser } from "@/app/types";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api-bridge";

type ownerProps = {
  id: string;
  title: string;
  user: IUser | null;
  search?: string;
  url?: string;
};

export default function Topbar({ id, title, user, search = "", url = "" }: ownerProps) {
  const [keyWord, setKeyWord] = useState<string>(search);
  const [username, setUserName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const router = useRouter();

  // 🔍 handle search
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url) router.push(`${url}?search=${keyWord}`);
    e.preventDefault();
  };

  // 🧩 Ambil data dari cookie dan API user/profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie("token");
        if (!token) return;

        // ✅ Ambil data user dari backend agar foto & nama terbaru
        const { status, data } = await get(`${BASE_API_URL}/user/profile`, token);
        if (status && data?.data) {
          const u = data.data;
          setUserName(u.name ?? "");
          setProfile(
            u.profile ? `${BASE_API_URL}/user-photo/${u.profile}` : "/image/default.png"
          );
        } else {
          // fallback ke cookie kalau gagal fetch
          const n = getCookie("name");
          const p = getCookie("profile");
          if (n) setUserName(n);
          if (p) setProfile(`${BASE_IMAGE_PROFILE}/${p}`);
        }
      } catch (error) {
        console.error("Error fetching profile in Topbar:", error);

        // fallback tetap bisa tampil dari cookie
        const n = getCookie("name");
        const p = getCookie("profile");
        if (n) setUserName(n);
        if (p) setProfile(`${BASE_IMAGE_PROFILE}/${p}`);
      }
    };

    fetchProfile();
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-11 bg-white rounded-bl-2xl rounded-tl-2xl sticky top-0 z-30">
      {/* Title (left side) */}
      <h1 className="text-4xl font-bold text-[#2B2D42]">{title}</h1>

      {/* Search + profile (right side) */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-full sm:w-64 md:w-80 lg:w-96 max-w-md transition-all">
          <CiSearch size={30} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-gray-700 w-full"
            onKeyUp={handleSearch}
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={profile || "/image/default.png"}
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-800">
            {username || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}





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
