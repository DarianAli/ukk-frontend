"use client";

import { useState, useEffect, ChangeEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getCookie } from "@/lib/client-cookies";
import { BASE_IMAGE_PROFILE } from "@/global";

// Lazy load FileUpload agar tidak memberatkan saat awal load
const FileUpload = dynamic(() =>
  import("@/components/FileUpload").then((mod) => mod.FileUploadDemo)
);

export default function UserSettingPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);

  // Ambil data dari cookie
  useEffect(() => {
    const storeEmail = getCookie("email");
    const storedName = getCookie("name");
    const storedProfile = getCookie("profile");

    if (storeEmail) setEmail(storeEmail);
    if (storedName) setName(storedName);
    if (storedProfile) setProfile(storedProfile);
  }, []);

  // Cleanup blob URL biar gak leak memori
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const handleFileUpload = (files: File[]) => {
    setUploadFiles(files);
    if (files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImage(imageUrl);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSaveProfile = () => {
    if (previewImage) {
      setProfile(previewImage);
    }
    setShowModal(false);
  };

  const handleSaveAll = () => {
    console.log("Saving all data...");
    alert("Data berhasil disimpan!");
  };

  const handleCancelModal = () => {
    setShowModal(false);
    setPreviewImage("");
    setUploadFiles([]);
  };

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* LEFT SECTION */}
      <div
        className={`w-1/2 flex flex-col justify-center bg-white shadow-lg relative overflow-hidden space-y-6 transition-all duration-300`}
      >
        <div className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-border mx-auto">
          <img
            src={profile || "/image/defautl.jpg"}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mx-auto px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all hover:scale-105"
        >
          Edit Profile Picture
        </button>
      </div>

      {/* RIGHT SECTION */}
      <div
        className={`w-1/2 flex flex-col justify-center px-16 transition-all duration-500`}
      >
        <h1 className="text-4xl font-semibold text-foreground mb-6">
          User Setting
        </h1>

        <div className="space-y-5">
          <div>
            <label className="block text-muted-foreground text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-input bg-white rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
            />
          </div>

          <div>
            <label className="block text-muted-foreground text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full border border-input bg-gray-100 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleSaveAll}
            className="px-8 py-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-600/90 transition-all hover:scale-105"
          >
            Save All Change
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
          onClick={handleCancelModal}
        >
          <div
            className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative transform transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
              Update Profile Picture
            </h2>

            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src={previewImage || profile || "/image/defautl.jpg"}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <FileUpload/>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleSaveProfile}
                disabled={!previewImage && uploadFiles.length === 0}
                className="px-8 py-3 bg-white text-black rounded-xl border hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                Done
              </button>
              <button
                onClick={handleCancelModal}
                className="px-8 py-3 bg-white text-black rounded-xl border hover:bg-gray-100 transition-all hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// const UserPage = () => {
//     return (
//         <div className="flex min-h-screen bg-white">
//             {/* <h1>Dashboard</h1> */}
//         </div>
//     )
// }
// export default UserPage
