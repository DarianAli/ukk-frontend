

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { put, post, get } from "@/lib/api-bridge";
import { FileUploadDemo } from "@/components/FileUpload";
import { getCookie } from "@/lib/client-cookies";
import { BASE_API_URL } from "@/global";

export default function UserSettingPage() {
  const router = useRouter();

  // 🔹 Ambil user ID dan token dari cookie
  const userId = getCookie("idUser") ?? ""; 
  const token = getCookie("token") ?? "";

  const [user, setUser] = useState({
    name: "",
    email: "",
    profile: "",
  });

  useEffect(() => {
    const fetchOneUser = async () => {
      try {
        const { status, data } = await get(`${BASE_API_URL}/user/profile`, token);
        if ( status && data?.data ) {
          const u = data.data;
          setUser({
            name: u.name ?? "",
            email: u.email ?? "",
            profile: u.profile
              ? `${BASE_API_URL}/user-photo/${u.profile}`
              : "image/defautl.png",
          })
        }
      } catch (error) {
        console.log("Error fetching profile:", error)
      }
    }

    if (token) fetchOneUser();
  }, [token]);

  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleChange = (key: string, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (files: File[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setUploadedFiles(files);
    }
  };

  // 🔹 Update name & email
  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/${userId}`;
      const { name, email } = user;
      const payload = new FormData();
      payload.append("name", name || "");
      payload.append("email", email || "");

      const { data } = await post(url, payload, token ?? "");
      if (data?.status) {
        toast(data?.message, { hideProgressBar: true, type: "success", containerId: "toastUser" });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, { hideProgressBar: true, type: "warning", containerId: "toastUser" });
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { hideProgressBar: true, type: "error", containerId: "toastUser" });
    }
  };

  // 🔹 Update foto profil
  const handleSaveProfile = async () => {
    try {
      if (!file) return;
      const url = `${BASE_API_URL}/user/upload/${userId}`;
      const payload = new FormData();
      payload.append("picture", file);

      const { data } = await post(url, payload, token);
      if (data?.status) {
        setShowModal(false);
        toast(data?.message, { hideProgressBar: true, type: "success", containerId: "toastUser" });
        setTimeout(() => router.refresh(), 1000);
      } else {
        toast(data?.message, { hideProgressBar: true, type: "warning", containerId: "toastUser" });
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { hideProgressBar: true, type: "error", containerId: "toastUser" });
    }
  };

  // ...

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
          <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-border">
            <img
              src={user.profile || "/image/defautl.png"}
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
          className="w-1/2 flex flex-col justify-center px-16"
        >
          <h1 className="text-4xl font-semibold text-foreground mb-6">
            User Settings
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-muted-foreground text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full border border-input bg-background rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
              />
            </div>

            <div>
              <label className="block text-muted-foreground text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-input bg-background rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
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

      {/* MODAL: UPDATE PROFILE PICTURE */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-card p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
                Update Profile Picture
              </h2>

              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                  <img
                    src={previewImage || user.profile || "/image/defautl.png"}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mb-6">
                <FileUploadDemo onChange={handleFileUpload} />
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSaveProfile}
                  disabled={!file}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  Done
                </button>
                <button
                  onClick={() => router.back()}
                  className="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-all hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ FOOTER */}
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
