import ChatbotIcon from "./ChatbotIcon";
import type { FC } from 'react';

type ChatRole = "user" | "model";

type ChatMessageType = {
  role: ChatRole;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
};

interface ChatMessageProps {
  chat: ChatMessageType;
}

const ChatMessage: FC<ChatMessageProps> = ({ chat }) => {
  // Default hideInChat and isError to false if undefined
  const hide = chat.hideInChat ?? false;
  const isError = chat.isError ?? false;

  if (hide) return null;

  return (
    <div
      className={`message ${
        chat.role === "model" ? "bot" : "user"
      }-message ${isError ? "error" : ""}`}
    >
      {chat.role === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
