"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { notify } from "@/lib/notifications";

export default function UploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleSelectFile() {
    inputRef.current?.click();
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      return;
    }

    try {
      notify.info("Uploading file...");

      setIsUploading(true);

      // Demo upload simulation.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      notify.success(
        `File uploaded successfully: ${selectedFile.name}`
      );

      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      notify.error("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Icon */}
      <div className="text-6xl mb-6">📎</div>

      {/* Title */}
      <h3 className="text-3xl font-bold mb-4">
        Upload Your Files
      </h3>

      {/* Description */}
      <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
        Drag and drop documents, PDFs, and images to prepare them
        for AI processing and retrieval-augmented generation.
      </p>

      {/* Selected File */}
      {selectedFile && (
        <div className="mb-6 text-zinc-300">
          Selected file: <strong>{selectedFile.name}</strong>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={handleSelectFile}
        >
          Select File
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
}