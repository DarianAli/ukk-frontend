"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { put, get } from "@/lib/api-bridge";
import { getCookie, storeCookie } from "@/lib/client-cookies";
import { BASE_API_URL } from "@/global";
import UserFileUploadModal from './UserFileUpload'
import { InputGroupComponent } from "@/components/inputComponent";

export default function UserSettingPage() {
  const router = useRouter();

  const userId = getCookie("idUser") ?? "";
  const token = getCookie("token") ?? "";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { status, data } = await get(`${BASE_API_URL}/user/profile`, token);
        if (status && data?.data) {
          const u = data.data;
          setUser({
            name: u.name ?? "",
            email: u.email ?? "",
            password: u.password ?? "",
            profile: u.profile
              ? `${BASE_API_URL}/user-photo/${u.profile}`
              : "/image/default.png",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (token) fetchUser();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = `${BASE_API_URL}/user/update/${userId}`;
      const payload = {
        name: user.name,
        email: user.email
      }

      const { data } = await put(url, payload, token);
      if (data?.status) {
        storeCookie("name", user.name)
        storeCookie("email", data.data.profile ?? "")
        toast.success(data.message, { containerId: "toastUser" });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast.warning(data.message, { containerId: "toastUser" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { containerId: "toastUser" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* MAIN CONTENT */}
      <div className="flex flex-1">
        {/* LEFT: PROFILE PICTURE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-1/2 flex flex-col justify-center items-center bg-white relative overflow-hidden space-y-6 rounded-2xl"
        >
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-xl border-4 border-border">
            <img
              src={user.profile || "/image/default.png"}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
          >
            Edit Profile Picture
          </button>
        </motion.div>

        {/* RIGHT: USER DATA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-1/2 flex flex-col justify-center px-16 bg-[#E2E0CB] rounded-3xl"
        >
          <h1 className="text-4xl font-semibold text-foreground mb-6">
            User Settings
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-5">
              <InputGroupComponent
                id={`name`}
                type="text"
                value={user.name}
                onChange={(val) => setUser({ ...user, name: val })}
                required={true}
                label="Name"
              />
              <InputGroupComponent 
                id={"email"}
                type="text"
                value={user.email}
                onChange={(val) => setUser({ ...user, email: val })}
                required={true}
                label="Email"
              />
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="px-8 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all hover:scale-105"
              >
                Save All Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && (
          <UserFileUploadModal
            userId={userId}
            token={token}
            currentProfile={user.profile}
            onClose={() => setShowModal(false)}
            onUploaded={(newProfileUrl) =>
              setUser((prev) => ({ ...prev, profile: newProfileUrl }))
            }
          />
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-24 bg-[#2E3B36] text-primary-foreground py-10 px-10 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">KosHunter</h3>
            <p className="text-sm opacity-80">
              Temukan kos terbaik dengan mudah, cepat, dan terpercaya.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Navigasi</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li>
                <a href="/owner/dashboard" className="hover:opacity-100 transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/tentang" className="hover:opacity-100 transition">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/bantuan" className="hover:opacity-100 transition">
                  Bantuan
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Kontak</h4>
            <p className="text-sm opacity-80">Email: darianaliapr@gmail.com</p>
            <p className="text-sm opacity-80">Instagram: @darianaliapr</p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-4 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Darian Ali Aprianto.
        </div>
      </footer>
    </div>
  );
}
