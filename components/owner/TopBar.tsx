"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { BASE_API_URL, BASE_IMAGE_PROFILE } from "@/global";
import { IKos } from "@/app/types";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api-bridge";

type ownerProps = {
  id: string;
  title: string;
  kos: IKos | null;
  search?: string;
  url?: string;
};

export default function Topbar({ id, title, kos, search = "", url = "" }: ownerProps) {
  const [keyWord, setKeyWord] = useState<string>(search);
  const [username, setUserName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [suggestion, setSuggestion] = useState<IKos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch KOS
  const fetchKos = async (text: string) => {
    if (!text.trim()) {
      setSuggestion([]);
      return;
    }

    try {
      setLoading(true);
      const token = getCookie("token");
      if (!token) return;

      const { data } = await get(`${BASE_API_URL}/kos/get?search=${text}`, token);

      if (data?.status) {
        setSuggestion(data.data.slice(0, 5)); // ✅ ambil 5 data teratas
      } else {
        setSuggestion([]);
      }
    } catch (error) {
      console.log("ERROR FETCH KOS:", error);
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ debounce
  useEffect(() => {
    const t = setTimeout(() => fetchKos(keyWord), 500);
    return () => clearTimeout(t);
  }, [keyWord]);

  // ✅ Close dropdown when click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestion([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ✅ Enter search
  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && url) {
      router.push(`${url}?search=${keyWord}`);
      setSuggestion([]);
    }
  };

  // ✅ Ambil profile user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie("token");
        if (!token) return;

        const { status, data } = await get(`${BASE_API_URL}/user/profile`, token);

        if (status && data?.data) {
          const u = data.data;
          setUserName(u.name ?? "");
          setProfile(
            u.profile ? `${BASE_API_URL}/user-photo/${u.profile}` : "/image/default.png"
          );
        } else {
          const n = getCookie("name");
          const p = getCookie("profile");
          if (n) setUserName(n);
          if (p) setProfile(`${BASE_IMAGE_PROFILE}/${p}`);
        }
      } catch (error) {
        console.log("ERROR FETCH PROFILE:", error);
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
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-[#2B2D42]">{title}</h1>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-6">

        {/* ✅ SEARCH BAR (relative untuk dropdown) */}
        <div ref={searchRef} className="relative flex items-center bg-gray-100 px-3 py-2 rounded-xl w-full sm:w-64 md:w-80 lg:w-96 max-w-md">

          <CiSearch size={30} className="text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search kos..."
            className="bg-transparent outline-none text-sm text-gray-700 w-full"
            onKeyUp={handleSearch}
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />

          {/* ✅ DROPDOWN */}
          {suggestion.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg border z-50 max-h-60 overflow-auto">
              {suggestion.map((item) => (
                <div
                  key={item.idKos}
                  onClick={() => router.push(`${url}?search=${item.name}`)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}

          {/* ✅ LOADING */}
          {loading && (
            <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg border z-50 px-3 py-2 text-sm text-gray-500">
              Loading...
            </div>
          )}

        </div>

        {/* ✅ PROFILE SECTION */}
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
