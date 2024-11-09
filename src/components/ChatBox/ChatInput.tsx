import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { postChatMessage } from "../../services/apiChatMessages";
import { ChatMessagePayload } from "../../types/ChatMessage";
import { useQueryClient } from "@tanstack/react-query";
import { EQuerryKeys } from "../../constants/EQuerryKeys";
import { CustomLoading } from "../Loading/Loading";
import { useForm } from "react-hook-form";
import { chatInputDefaultValue } from "./constants/chatInput.constants";

export type MessageInputRef = {
  focusInput: () => void;
};

type ChatInputFormType = {
  message: string;
  answers: string[];
};

export const ChatInput = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { chatId } = useParams();
  const { register, watch, handleSubmit, reset } = useForm<ChatInputFormType>({
    defaultValues: chatInputDefaultValue
  });

  useEffect(() => {
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLInputElement;
    if (messageInput) {
      messageInput.focus();
    }
  }, [chatId]);

  const sendMessage = async (data: ChatInputFormType) => {
    setIsLoading(true);

    const message = [data.message, ...data.answers].join(" ");
    const newMessage = {
      chatHistoryId: chatId,
      message: {
        position: "right",
        type: "text",
        title: "You",
        text: message
      }
    } as ChatMessagePayload;

    const { data: resData } = await postChatMessage(newMessage);
    reset();
    queryClient.invalidateQueries({ queryKey: [EQuerryKeys.CHAT_MESSAGE] });
    queryClient.invalidateQueries({
      queryKey: [EQuerryKeys.CHAT_HISTORY_BY_USER]
    });
    console.log(data);
    if (chatId !== resData?.chatHistoryId)
      navigate(`/chat/${resData.chatHistoryId}`);

    setIsLoading(false);
  };

  const isDisabledSubmit =
    !watch("message") && watch("answers").every((answer) => !answer);

  return (
    <form
      className="absolute bottom-0 w-full"
      onSubmit={handleSubmit(sendMessage)}
    >
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-10">
          <CustomLoading />
        </div>
      )}
      <div className="p-4 items-center flex gap-4 w-full justify-center">
        <div className="grid grid-cols-2 grid-rows-3 w-3/4 gap-x-2 gap-y-1">
          <TextField
            id="message-input"
            className="w-full col-span-2"
            variant="outlined"
            size="small"
            placeholder="Type in your question"
            type="text"
            {...register("message")}
          />
          {Array.from({ length: 4 }).map((_, index) => (
            <TextField
              key={index}
              className="w-full"
              variant="outlined"
              size="small"
              placeholder={`Type in answer ${String.fromCharCode(65 + index)}`}
              type="text"
              {...register(`answers.${index}`)}
            />
          ))}
        </div>
        <Button type="submit" variant="contained" disabled={isDisabledSubmit}>
          Send
        </Button>
      </div>
    </form>
  );
};
