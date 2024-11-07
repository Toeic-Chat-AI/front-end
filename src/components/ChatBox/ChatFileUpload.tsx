import React, { useState, useCallback } from "react";

export const ChatFileUpload = () => {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  }, []);

  return (
    <div
      className={`border-gray-100 border-2 h-40 w-40 self-end m-4 border-dashed flex items-center justify-center ${
        dragging ? "bg-gray-200" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="text-center">
          {dragging ? "Drop here" : "Drag & drop files here"}
        </div>
      )}
    </div>
  );
};
