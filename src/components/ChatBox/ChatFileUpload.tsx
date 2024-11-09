import React, { useState, useCallback, useRef } from "react";
import { postFile } from "../../services/apiFile";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";
import { CustomLoading } from "../Loading/Loading";

export const ChatFileUpload = () => {
  const queryClient = useQueryClient();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { chatId } = useParams();

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

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    setIsLoading(true);
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const droppedFile = files[0];
      setFile(droppedFile);

      // Generate preview based on file type
      if (droppedFile.type.startsWith("image")) {
        setPreview(URL.createObjectURL(droppedFile));
      } else if (droppedFile.type === "application/pdf") {
        setPreview(URL.createObjectURL(droppedFile));
      } else {
        setPreview(null);
      }
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
      });
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY]
      });
      const data = await postFile(droppedFile, chatId);
      console.log(data);
    }
    setIsLoading(false);
  }, []);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      // Generate preview based on file type
      if (selectedFile.type.startsWith("image")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type === "application/pdf") {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
      });
      queryClient.invalidateQueries({
        queryKey: [EQuerryKeys.CHAT_HISTORY]
      });
      //
      const data = await postFile(selectedFile, chatId);
      console.log(data);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-10">
          <CustomLoading />
        </div>
      )}
      <div
        className={`border-gray-100 border-2 h-40 w-40 self-end m-4 border-dashed flex items-center justify-center
          hover:cursor-pointer hover:bg-gray-200 ${
            dragging ? "bg-gray-200" : ""
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {preview ? (
          file?.type.startsWith("image") ? (
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : file?.type === "application/pdf" ? (
            <embed
              src={preview}
              type="application/pdf"
              className="h-full w-full object-cover overflow-hidden"
            />
          ) : null
        ) : (
          <div className="text-center">
            {dragging ? "Drop here" : "Drag & drop files here"}
          </div>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf, .png, .jpg, .jpeg"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
