"use client";

import { useState, useEffect, KeyboardEvent, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import { BASE_API_URL, BASE_IMAGE_PROFILE, BASE_IMAGE_KOS } from "@/global";
import { IKos, IUser } from "@/app/types";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";
import { get } from "@/lib/api-bridge";
import { cn } from "@/lib/utils";
import { Building2, MapPin } from "lucide-react";

type ownerProps = {
  id: string;
  title: string;
  kosList: IKos[];
  search?: string;
  url?: string;
  user?: IUser | null;
};

export default function Topbar({
  id,
  title,
  kosList,
  search = "",
  url = "",
  user,
}: ownerProps) {
  const [keyWord, setKeyWord] = useState<string>(search);
  const [username, setUserName] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [suggestion, setSuggestion] = useState<IKos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
  const [query, setQuery] = useState("")
  const filetedKos = kosList.filter((k) => k.name.toLowerCase().includes(query.toLowerCase()))

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch KOS suggestion
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
    } catch (error) {
      console.log("ERROR FETCH KOS:", error);
      setSuggestion([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchKos(keyWord), 500);
    return () => clearTimeout(t);
  }, [keyWord]);

  // Tutup dropdown + reset ukuran saat klik luar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestion([]);
        setIsSearchFocus(false); // reset ke ukuran awal
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Tekan enter untuk search
  const handleSearch = async () => {
    const TOKEN = getCookie("token") || ""

    if (!keyWord.trim()) {
      setSuggestion([]);
      return;
    }

    try {
      setLoading(true);
      const { data } = await get(`${BASE_API_URL}/kos/get`, TOKEN);
      if (data?.status) {
        const results = data.data.filter((item: IKos) =>
          item.name.toLowerCase().includes(keyWord.toLowerCase())
        );
        setSuggestion(results);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data profile user
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
      } catch {
        const n = getCookie("name");
        const p = getCookie("profile");
        if (n) setUserName(n);
        if (p) setProfile(`${BASE_IMAGE_PROFILE}/${p}`);
      }
    };

    fetchProfile();
  }, []);

  return (
<header className="flex justify-between items-center px-6 py-6 bg-white rounded-bl-2xl rounded-tl-2xl sticky top-0 z-30">
      {/* LEFT: Judul halaman */}
      <div
        className={cn(
          "flex items-center gap-3 transition-all duration-300",
          isSearchFocus && "opacity-0 w-0 overflow-hidden"
        )}
      >
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        <div
          ref={searchRef}
          className={cn(
            "relative transition-all duration-300",
            isSearchFocus ? "flex-1 mx-8" : "w-80"
          )}
        >
          <div className="flex items-center bg-white px-4 py-2.5 rounded-xl border transition-all duration-300 hover:bg-muted">
            <CiSearch size={20} className="text-muted-foreground mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search kos..."
              className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-muted-foreground"
              onKeyUp={handleSearch}
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              onFocus={() => setIsSearchFocus(true)}
            />
          </div>

          {/* Dropdown hasil search */}
          {(suggestion.length > 0 || loading) && isSearchFocus && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg rounded-xl border border-border z-50 max-h-96 overflow-auto">
              {loading ? (
                <div className="px-4 py-3 text-sm text-muted-foreground flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                suggestion.map((item, index) => (
                  <div
                    key={item.idKos}
                    onClick={() => {
                      router.push(`${url}?search=${item.name}`);
                      setSuggestion([]);
                      setIsSearchFocus(false);
                    }}
                    className={cn(
                      "px-4 py-3 hover:bg-muted/30 cursor-pointer transition-colors duration-150 flex items-center gap-3",
                      index === 0 && "rounded-t-xl",
                      index === suggestion.length - 1 && "rounded-b-xl"
                    )}
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                      {item.foto && item.foto.length > 0 ? (
                        <Image
                          src={`${BASE_IMAGE_KOS}/${item.foto[0].foto}`}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 className="text-muted-foreground" size={24} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">
                        {item.name}
                      </h4>
                      {item.address && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
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

        {/* USER PROFILE */}
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-300",
            isSearchFocus && "opacity-0 w-0 overflow-hidden"
          )}
        >
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
      </div>
    </header>
  );
}
