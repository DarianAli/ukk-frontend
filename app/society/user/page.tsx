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
import { Camera, Shield, Calendar, Mail, User, Phone } from "lucide-react";
import { ButtonSuccess } from "@/components/button";

export default function UserSettingPage() {
  const router = useRouter();

  const userId = getCookie("idUser") ?? "";
  const token = getCookie("token") ?? "";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
    role: "",
    phone: "",
    createdAt: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
            role: u.role ?? "",
            phone: u.phone ?? "",
            createdAt: u.createdAt ?? "",
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
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
      {/* Profile Card */}
      <div className="lg:col-span-1">
        <motion.div
          layout
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden"
        >
        {/* Header Start */}
        <div className="bg-primary/10 px-6 py-8 flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-primary/20 border-4 border-card flex items-center justify-center overflow-hidden shadow-lg">
              <span className="text-4xl font-bold text-primary">
                {user.profile ? (
                  <img
                    src={user.profile}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </span>
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors" onClick={() => setShowModal(true)}>
                <Camera size={16}/>
              </button>
            )}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">Society</p>
        </div>

        {/* Quick Stats BROWW */}
        <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield size={16} className="text-primary"/>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="font-medium text-foreground">{user.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar size={16} className="text-primary"/>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member Since</p>
                <p className="font-medium text-foreground">{user.createdAt.split("T")[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail size={16} className="text-primary"/>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground truncate max-w-[150px]">{user.email}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-2">
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Profile Information
            </h3>
            {!isEditing && (
              <ButtonSuccess type="button" onClick={() => setIsEditing(true)}>
                Edit Profile
              </ButtonSuccess> 
            )}
          </div>

          <div className="p-6 space-y-5">
            {isEditing ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
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
                      <InputGroupComponent
                        id={"phone"}
                        type="text"
                        value={user.phone}
                        onChange={(val) => setUser({ ...user, phone: val })}
                        label="Phone"
                      />
                    </div>


                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-3border border-input bg-background hover:bg-[#FF746C] transition-all hover:scale-105 hover:text-accent-foreground rounded-xl flex-1"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-8 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-all hover:scale-105 flex-1"
                      >
                        Save All Changes
                      </button>
                    </div>
                  </form>
                  </motion.div>
                </div>


                {showModal && (
                  <UserFileUploadModal
                    userId={userId}
                    token={token}
                    currentProfile={user.profile}
                    onClose={() => setShowModal(false)}
                    onUploaded={(newProfileUrl) => setUser((prev) => ({ ...prev, profile: newProfileUrl }))}
                  />
                )}
              </>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <User size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <Mail size={18} className="text-muted-foreground mt-0.5"/>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium text-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                    <Phone size={18} className="text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-sm font-medium text-foreground">{user.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      </div>

      {/* FOOTER */}
        <footer className="bg-[#2E3B36] text-primary-foreground py-10 px-10 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm">
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
                  <a href="/society/dashboard" className="hover:opacity-100 transition">
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
