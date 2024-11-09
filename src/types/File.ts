export type File = {
  _id: string;
  fileName: string;
  fileType: string;
  filePath: string;
  ChatHistoryId: string;
};

export type FileResponse = {
  data: {
    chatId: string;
    uploadedData: File[];
  };
  AiData?: any;
};
