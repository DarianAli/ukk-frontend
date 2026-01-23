"use client"

import { useState, useEffect, useRef } from "react"
import { CiSearch } from "react-icons/ci"
import Image from "next/image"
import { BASE_API_URL, BASE_IMAGE_KOS } from "@/global"
import { IKos, IUser } from "@/app/types"
import { getCookie } from "@/lib/client-cookies"
import { useRouter } from "next/navigation"
import { get } from "@/lib/api-bridge"
import { Building2, MapPin, Menu } from "lucide-react"

type TopbarProps = {
    id: string;
    title: string
    user: IUser | null;
    onMenuClick: () => void;
    onSearch?: (keyword: string) => void;
}

export default function Topbar({ id, title, user, onMenuClick, onSearch }: TopbarProps) {
  const [keyWord, setKeyWord] = useState("");
  const [suggestion, setSuggestion] = useState<IKos[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

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
      if (data?.status) setSuggestion(data.data.slice(0, 5));
      else setSuggestion([]);
    } catch {
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => fetchKos(keyWord), 400);
    return () => clearTimeout(t);
  }, [keyWord]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocus(false);
        setSuggestion([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-4 bg-white sticky top-0 z-30 rounded-bl-2xl rounded-tl-2xl">

      {/* Left section */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-700 hover:text-white hover:bg-muted rounded-lg transition-colors"
        >
          <Menu size={28}/>
        </button>

        <h1 className="hidden md:block text-2xl font-semibold text-gray-800">{title}</h1>
      </div>

      {/* SEARCH */}
      <div className="flex items-center flex-1 md:justify-end px-4 gap-3">
        <div ref={searchRef} className="relative hidden sm:block w-48 md:w-72 max-w-xs md:max-w-sm">
          <div className="flex items-center bg-white px-4 md:px-5 py-2.5 rounded-xl border border-border hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <CiSearch size={20} className="text-gray-500 mr-3 md:mr-4 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search kos..."
              className="bg-transparent outline-none text-sm text-gray-700 w-full"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              onFocus={() => setIsSearchFocus(true)}
            />
          </div>

          {/* DROPDOWN */}
          {(suggestion.length > 0 || loading) && isSearchFocus && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-xl border mt-2 z-50 max-h-96 overflow-auto">
              {loading ? (
                <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                suggestion.map((item) => (
                  <div
                    key={item.idKos}
                    onClick={() => {
                      router.push(`/society/kos?search=${item.name}`);
                      setSuggestion([]);
                      setIsSearchFocus(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                      {item.foto && item.foto.length > 0 ? (
                        <Image
                          src={`${BASE_IMAGE_KOS}/${item.foto[0].foto}`}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Building2 className="text-gray-400 w-full h-full p-3" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      {item.address && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <MapPin size={12} />
                          {item.address}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src={
              user?.profile
                ? `${BASE_API_URL}/user-photo/${user.profile}`
                : "/image/default.png"
            }
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
            {user?.name ?? "User"}
          </span>
        </div>
      </div>
    </header>
  );
}
