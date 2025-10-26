"use client";

import Image from "next/image";
import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

export default function pageLog() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const url = `${BASE_API_URL}/user/login`;
      const payload = { email, password };
      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.status == true) {
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "success",
          autoClose: 2000,
        });
        console.log("DATA LOGIN:", data);
        storeCookie("token", data.TOKEN);
        storeCookie("idUser", data.data.idUser);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);
        let role = data.data.role;
        if (role === "owner") setTimeout(() => router.replace(`/owner/dashboard`), 1000);
        else if (role === "society")
          setTimeout(() => router.replace(`/society/dashboard`), 1000);
      } else
        toast(data.message, {
          hideProgressBar: true,
          containerId: `toastLogin`,
          type: "warning",
        });
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast("user tidak ditemukan, coba periksa kembali email dan password anda", {
          containerId: `toastLogin`,
          type: `error`,
          hideProgressBar: true,
        });
    }
  };
}


  return (
    <div className="flex w-screen h-screen bg-fancy bg-blend-overlay p-5 gap-6 overflow-hidden">
      <ToastContainer containerId={`toastLogin`} />

      {/* Left Part */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full md:w-1/2 h-full flex flex-col justify-start px-10 md:px-20 bg-transparent relative rounded-3xl"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mt-10">
            Kos <span className="text-[#4E635E]">Hunter</span>
          </h1>
          <p className="text-slate-500 mb-10 tracking-wide text-lg">
            Find. Compare. Stay Easy.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-slate-600 mt-44">Welcome Hunters</p>
          <p className="text-base text-slate-700 mt-2 font-semibold">
            Please login to continue
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id={"email"}
            />
            <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
              value={password}
              onChange={e => setPassword(e.target.value)}
              id={"password"}
            />
            <div 
              onClick={() => setShowPassword(!showPassword)}
              className="p-3 cursor-pointer hover:bg-slate-100 bg-slate-300">
                {showPassword ? (
                  // icon eye on
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 
                    4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 
                    0 .639C20.577 16.49 16.64 19.5 12 
                    19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                ) : (
                  // icon eye off
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-slate-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 
                    10.477 0 0 0 1.934 12C3.226 
                    16.338 7.244 19.5 12 
                    19.5c.993 0 1.953-.138 
                    2.863-.395M6.228 6.228A10.451 
                    10.451 0 0 1 12 4.5c4.756 0 
                    8.773 3.162 10.065 7.498a10.522 
                    10.522 0 0 1-4.293 
                    5.774M6.228 6.228 3 3m3.228 
                    3.228 3.65 3.65m7.894 
                    7.894L21 21m-3.228-3.228-3.65-3.65m0 
                    0a3 3 0 1 0-4.243-4.243m4.242 
                    4.242L9.88 9.88"
                  />
                </svg>
                )}
              </div>
          </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#818C78] text-white font-semibold hover:bg-[#A6B49E] transition transition-duration-[250ms]"
            >
              Login
            </button>
          </form>



          <p className="mt-40 text-slate-600 text-sm ">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Right Part */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="hidden md:flex w-1/2 h-full relative overflow-hidden rounded-3xl shadow-xl"
      >
        <Image
          src="/image/bglog.jpg"
          alt="Login Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.8 }}
          className="absolute bottom-8 left-8 text-white"
        >
          <h2 className="text-3xl font-bold">Find Your Next Kos</h2>
          <p className="text-lg opacity-90">
            Comfortable • Affordable • Near You
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}


