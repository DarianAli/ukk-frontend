"use client";

import { BASE_API_URL } from "@/global";
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion"; // untuk animasi

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showPPassword, setShowPPassword] = useState<boolean>(false);

  const router = useRouter();
  const [role, setRole] = useState<string>("society");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      const url = `${BASE_API_URL}/user/register`;
      const payload = JSON.stringify({
        name,
        email,
        password,
        phone,
        role,
      });

      const { data } = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.status) {
        toast.success(data.message || "Registration successful!", {
          hideProgressBar: true,
          containerId: "toastRegister",
          autoClose: 2000,
        });

        // simpan data ke cookie jika dibutuhkan
        storeCookie("token", data.TOKEN);
        storeCookie("id", data.data.id);
        storeCookie("name", data.data.name);
        storeCookie("role", data.data.role);
        storeCookie("phone", data.data.phone);

        // redirect ke login
        setTimeout(() => router.replace("/login"), 1500);
      } else {
        toast.warning(data.message || "Registration failed.", {
          hideProgressBar: true,
          containerId: "toastRegister",
          autoClose: 2000,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Something went wrong: ${error.message || error}`, {
        hideProgressBar: true,
        containerId: "toastRegister",
        autoClose: 3000,
      });
    }
};
return (
    <div className="flex w-screen h-screen bg-fancy bg-blend-overlay p-5 gap-6 overflow-hidden">
      <ToastContainer containerId="toastRegister" />

      {/* LEFT SIDE (Image Section) */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="hidden md:flex w-1/2 h-full relative overflow-hidden rounded-3xl"
      >
        <Image
          src="/image/bgreg.jpg"
          alt="Register Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-3xl font-bold">Join Kos Hunter Today</h2>
          <p className="text-lg opacity-90">Find your perfect place easily!</p>
        </div>
      </motion.div>

      {/* RIGHT SIDE (Form Section) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full md:w-1/2 h-full flex flex-col justify-start px-10 md:px-20 bg-transparent rounded-3xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 mt-10">
          Create <span className="text-[#4E635E]">Account</span>
        </h1>
        <p className="text-slate-500 mb-10 tracking-wide text-lg mt-2">
          Start your journey with us
        </p>

        <form onSubmit={handleSubmit}  className="flex flex-col gap-6 mt-28">
          {/* name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id={"name"}
          />

          {/* email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id={"email"}
          />

          {/* password */}
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
            <input
              type={showPPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id={"password"}
            />
            <div 
              onClick={() => setShowPPassword(!showPPassword)}
              className="p-3 cursor-pointer hover:bg-slate-100 bg-slate-300">
                {showPPassword ? (
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

          {/* phone */}
          <input
            type="phone"
            placeholder="Phone"
            className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sky-300 focus:outline-none transition text-slate-700"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id={"phone"}
          />

          {/* Role Selection Button */}
          <div className="flex justify-between items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`flex-1 py-3 rounded-xl font-semibold border transition duration-250 ${
                role === "owner"
                  ? "bg-[#E2E0C8] text-[#2B2D42] border-[#E2E0C8]"
                  : "bg-white  text-[#818C78] border-slate-300 hover:border-[#2B2D42]"
              }`}
            >
              Owner
            </button>
            <button
              type="button"
              onClick={() => setRole("society")}
              className={`flex-1 py-3 rounded-xl font-semibold border transition duration-250 ${
                role === "society"
                  ? "bg-[#E2E0C8] text-[#2B2D42] border-[#E2E0C8]"
                  : "bg-white  text-[#818C78] border-slate-300 hover:border-[#2B2D42]"
              }`}
            >
              Society
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#818C78] text-white font-semibold hover:bg-[#A6B49E] transition duration-250"
          >
            Register
          </button>
        </form>

        <p className="mt-24 text-slate-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

