"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { post } from "@/lib/api-bridge";
import { FileUploadDemo } from "@/components/FileUpload";
import { BASE_API_URL } from "@/global";

type UserFileUploadModalProps = {
  userId: string;
  token: string;
  currentProfile: string;
  onClose: () => void;
  onUploaded: (newProfileUrl: string) => void;
};

export default function UserFileUploadModal({
  userId,
  token,
  currentProfile,
  onClose,
  onUploaded,
}: UserFileUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const maxSize = 2 * 1024 * 1024; // 2MB

  const handleFileUpload = (files: File[]) => {
    if (files.length > 1) {
      toast.warning("Only one file can be uploaded.", { containerId: "toastUser" });
      return;
    }

    const selected = files[0];
    if (selected.size > maxSize) {
      toast.warning("File is too large. Max size is 2MB.", { containerId: "toastUser" });
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = async () => {
    if (!file) {
      toast.warning("Please select a file first.", { containerId: "toastUser" });
      return;
    }

    try {
      const url = `${BASE_API_URL}/user/upload/${userId}`;
      const payload = new FormData();
      payload.append("picture", file);

      const { data } = await post(url, payload, token);
      if (data?.status) {
        const newProfile = data?.fileName || data?.data?.profile;
        const newProfileUrl = newProfile
          ? `${BASE_API_URL}/user-photo/${newProfile}`
          : currentProfile;

        toast.success(data?.message, { containerId: "toastUser" });
        onUploaded(newProfileUrl);
        onClose();
      } else {
        toast.warning(data?.message, { containerId: "toastUser" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Something went wrong during upload.", { containerId: "toastUser" });
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card p-8 rounded-2xl w-full max-w-2xl shadow-2xl relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">
          Update Profile Picture
        </h2>

        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={preview || currentProfile || "/image/default.png"}
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
            onClick={handleSave}
            disabled={!file}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
          >
            Done
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/90 transition-all hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
