"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "react-toastify";

type FileUploadDemoProps = {
  acceptTypes?: string[];
  maxSize?: number; // dalam KB
  label?: string;
  id?: string;
  onChange?: (files: File[]) => void;
};

export function FileUploadDemo({
  acceptTypes = [],
  maxSize = 2048,
  label = "Upload File",
  id = "file-upload",
  onChange,
}: FileUploadDemoProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (incoming: File[]) => {
    // Validasi tipe file
    if (acceptTypes.length > 0) {
      const invalid = incoming.filter(
        (f) => !acceptTypes.includes(f.type)
      );
      if (invalid.length > 0) {
        toast.warning(`File type not allowed`, { containerId: "toastUser" });
        return;
      }
    }

    // Validasi ukuran (KB → byte)
    const maxBytes = maxSize * 1024;
    const tooLarge = incoming.filter((f) => f.size > maxBytes);
    if (tooLarge.length > 0) {
      toast.warning(`File too large. Max size is ${maxSize / 1024} MB`, {
        containerId: "toastUser",
      });
      return;
    }

    setFiles(incoming);
    onChange?.(incoming);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <label className="font-semibold mb-2 block">{label}</label>

      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
