"use client";

import React, { useState } from "react";
import { AlertWarning } from "../Alert";

type Props = {
  disabled?: boolean;
  acceptTypes: string[];
  onChange: (file: File | null) => void;
  className?: string;
  required?: boolean;
  id?: string;
  label?: string;
  maxSize: number; // dalam KB
};

export default function FileUpload(props: Props) {
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const limitSize = props.maxSize || 2048; // default 2 MB
  const acceptTypes = props.acceptTypes.join(",");

  const handleFileInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: (data: File | null) => void
  ): void => {
    const target = event.target as HTMLInputElement;
    const currentFile = target.files?.[0];
    setMessage("");
    setFileName("");

    if (!currentFile) {
      callback(null);
      return;
    }

    // Validasi tipe file
    if (!props.acceptTypes.includes(currentFile.type)) {
      target.value = "";
      setMessage(
        `'${currentFile.type}' is invalid file type. Allowed types: ${acceptTypes}`
      );
      callback(null);
      return;
    }

    // Validasi ukuran file (KB)
    const fileSizeKB = currentFile.size / 1024;
    if (fileSizeKB > limitSize) {
      target.value = "";
      setMessage(
        `File too large! Max size is ${limitSize / 1024} MB, but your file is ${(
          fileSizeKB / 1024
        ).toFixed(2)} MB`
      );
      callback(null);
      return;
    }

    setFileName(currentFile.name);
    callback(currentFile);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col items-center justify-center p-6">
      <label
        htmlFor={props.id}
        className="cursor-pointer flex flex-col items-center justify-center text-center"
      >
        <strong className="text-base font-semibold text-slate-600 mb-2">
          {props.label || "Upload File"}
        </strong>
        <div className="text-sm text-slate-500">
          Klik untuk memilih file (max {limitSize / 1024} MB)
        </div>

        <input
          type="file"
          id={props.id}
          accept={acceptTypes}
          disabled={props.disabled}
          required={props.required || false}
          className="hidden"
          onChange={(e) => handleFileInput(e, props.onChange)}
        />
      </label>

      {fileName && (
        <div className="mt-4 text-sm text-green-600 font-medium">
          File terpilih: {fileName}
        </div>
      )}

      {message && (
        <div className="mt-4 w-full max-w-md">
          <AlertWarning title="Peringatan">{message}</AlertWarning>
        </div>
      )}
    </div>
  );
}
