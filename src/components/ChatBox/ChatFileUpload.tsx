import React, { useState, useCallback, useRef, useEffect } from "react";
import { postFile } from "../../services/apiFile";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";
import { CustomLoading } from "../Loading/Loading";
import { File } from "../../types/File";

export const ChatFileUpload = ({ files }: { files?: File[] }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<FileList | File[] | null>(null);
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

  useEffect(() => {
    setPreview(files?.[0]?.filePath || null);
  }, [files]);

  const handleUploadFiles = async (files: FileList) => {
    setFile(files);
    setPreview(URL.createObjectURL(files[0]));

    const { data } = await postFile(files, chatId);

    queryClient.invalidateQueries({
      queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
    });
    queryClient.invalidateQueries({
      queryKey: [EQuerryKeys.CHAT_HISTORY]
    });
    navigate(`/chat/${data.chatId}`);
  };

  const handleDrop = async (e: React.DragEvent) => {
    setIsLoading(true);
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleUploadFiles(files);
    }
    setIsLoading(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleUploadFiles(files);
    }
    setIsLoading(false);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      {isLoading && <CustomLoading />}
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
      <input
        type="file"
        ref={fileInputRef}
        accept=".png, .jpg, .jpeg"
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple
      />
    </>
  );
};
