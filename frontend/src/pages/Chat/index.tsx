import { useState } from "react";
import { toast } from "sonner";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessage from "@/components/chat/ChatMessage";
import DocumentSelector from "@/components/chat/DocumentSelector";

import { ChatService } from "@/services/chat";
import type { ChatSource } from "@/services/chat";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
}

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Selected documents
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const handleSend = async (
    question: string
  ) => {

    const userMessage: Message = {
      role: "user",
      content: question,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {

      setLoading(true);

      const response =
        await ChatService.askQuestion(
          question,
          selectedDocuments.length === 0
            ? undefined
            : selectedDocuments
        );

      const aiMessage: Message = {
        role: "assistant",
        content: response.answer,
        sources: response.sources,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to get AI response."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        KnowledgeForge AI
      </h1>

      <DocumentSelector
        selected={selectedDocuments}
        onChange={setSelectedDocuments}
      />

      <div className="flex h-[calc(100vh-18rem)] flex-col">

        <div className="mb-6 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6">

          {messages.length === 0 ? (

            <p className="text-center text-slate-500">

              Ask a question about your uploaded documents.

            </p>

          ) : (

            messages.map((message, index) => (

              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
                sources={message.sources}
              />

            ))

          )}

        </div>

        <ChatInput
          loading={loading}
          onSend={handleSend}
        />

      </div>

    </div>
  );
}

export default ChatPage;