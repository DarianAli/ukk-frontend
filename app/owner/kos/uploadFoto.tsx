"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { post } from "@/lib/api-bridge";
import { FileUploadDemo } from "@/components/FileUpload";
import { BASE_API_URL } from "@/global";

type UploadType = "user" | "kos";

type FileUploadModalProps = {
  uploadType: UploadType;
  targetId: string;
  token: string;
  currentImages?: string[]; // user = 1, kos = banyak
  onClose: () => void;
  onUploaded: (urls: string[]) => void;
  onSuccess: () => void
};

export default function FileUploadModal({
  uploadType,
  targetId,
  token,
  currentImages = [],
  onClose,
  onUploaded,
  onSuccess,
}: FileUploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const maxSize = 2 * 1024 * 1024;

  const isKos = uploadType === "kos";
  const maxFiles = isKos ? 5 : 1;

  const handleFileUpload = (selected: File[]) => {
    if (selected.length > maxFiles) {
      toast.warning(`Max ${maxFiles} file(s).`, { containerId: `toastKos` });
      return;
    }

    for (const file of selected) {
      if (file.size > maxSize) {
        toast.warning("File too large (max 2MB)", { containerId: `toastKos` });
        return;
      }
    }

    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleSave = async () => {
    if (!files.length) {
      toast.warning("Select file first", { containerId: `toastKos` });
      return;
    }
    toast.success("Berhasil Upload!", { containerId: `toastUser` })

    try {
      const url =
        uploadType === "user"
          ? `${BASE_API_URL}/user/upload/${targetId}`
          : `${BASE_API_URL}/foto/upload/${targetId}`;

      const payload = new FormData();
      files.forEach((file) =>
        payload.append(uploadType === "user" ? "picture" : "foto", file)
      );

      const { data } = await post(url, payload, token);

      if (data?.status) {
        const uploadedUrls =
          uploadType === "user"
            ? [`${BASE_API_URL}/user-photo/${data.data.profile}`]
            : files.map(
                (f) => `${BASE_API_URL}/kos-photo/${f.name}`
              );

        toast.success(data.message, { containerId: `toastKos` });
        onUploaded(uploadedUrls);
        onClose();
        onSuccess?.()
      } else {
        toast.warning(data?.message);
      }
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        className="bg-white p-6 rounded-2xl max-w-xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload {uploadType === "user" ? "Profile" : "Kos"} Photo
        </h2>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {(previews.length ? previews : currentImages).map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-24 h-24 rounded-lg object-cover border"
            />
          ))}
        </div>

        <FileUploadDemo onChange={handleFileUpload} />

        <div className="flex gap-3 justify-center mt-6">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
