import { useRef } from 'react';
import type { FC } from 'react';

type ChatRole = "user" | "model";

interface ChatMessageType {
  role: ChatRole;
  text: string;
  isError?: boolean;
  hideInChat?: boolean;
}


import type { Dispatch, SetStateAction} from "react";

interface ChatFormProps {
  chatHistory: ChatMessageType[];
  setChatHistory: Dispatch<SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => void | Promise<void>;
}


const ChatForm: FC<ChatFormProps> = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
    
        const userMessage = inputRef.current?.value.trim();
        if (!userMessage) return;
    
        if (inputRef.current) inputRef.current.value = "";
    
        const updatedHistory: ChatMessageType[] = [
            ...chatHistory,
            { role: "user", text: userMessage }
        ];
          
    
        setChatHistory(updatedHistory);
    
        setTimeout(() => {
            const thinkingMessage: ChatMessageType = { role: "model", text: "Thinking..." };

            const thinkingHistory: ChatMessageType[] = [...updatedHistory, thinkingMessage];
            
            setChatHistory(thinkingHistory);
            
    
          generateBotResponse([
            ...updatedHistory,
            { role: "user", text: ` Using the details provided above, please address this query: ${userMessage}` }
          ]);
        }, 600);
    };
      

    return (
        <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
            <input ref={inputRef} type="text" placeholder="Message..."
            className="message-input" required />
            <button className="material-symbols-outlined">arrow_upward</button>
        </form>
    );
};

export default ChatForm;