import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const [showDocuments, setShowDocuments] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendSuggestion = (text: string) => {
    handleSend(text);
  };

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

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
          sources: response.sources,
        },
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
    <div className="space-y-4">

      <div>

        <h1 className="text-3xl font-bold">
          KnowledgeForge AI Assistant
        </h1>

        <p className="mt-2 text-slate-400">
          Ask questions about your uploaded
          documents.
        </p>

      </div>

      {/* Collapsible Document Selector */}

      <div className="rounded-xl border border-slate-800 bg-slate-900">

        <button
          onClick={() =>
            setShowDocuments(!showDocuments)
          }
          className="flex w-full items-center justify-between p-4"
        >

          <div>

            <h2 className="font-semibold">

              Documents

            </h2>

            <p className="text-sm text-slate-400">

              {selectedDocuments.length === 0
                ? "Searching across all uploaded documents"
                : `${selectedDocuments.length} document(s) selected`}

            </p>

          </div>

          {showDocuments ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
          )}

        </button>

        {showDocuments && (

          <div className="border-t border-slate-800 p-4">

            <DocumentSelector
              selected={selectedDocuments}
              onChange={
                setSelectedDocuments
              }
            />

          </div>

        )}

      </div>

      {/* Chat */}

      <div className="flex h-[calc(100vh-14rem)] flex-col">

        <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-6">

          {messages.length === 0 ? (

            <div className="flex h-full flex-col items-center justify-center text-center">

              <h2 className="mb-3 text-3xl font-bold">

                👋 Welcome

              </h2>

              <p className="mb-8 max-w-xl text-slate-400">

                Upload your PDFs and ask
                questions in natural language.

              </p>

              <div className="grid gap-3 md:grid-cols-2">

                <button
                  onClick={() =>
                    sendSuggestion(
                      "Summarize my uploaded documents."
                    )
                  }
                  className="rounded-xl border border-slate-700 p-4 transition hover:border-blue-500"
                >

                  💡 Summarize my notes

                </button>

                <button
                  onClick={() =>
                    sendSuggestion(
                      "Explain the important concepts in these documents."
                    )
                  }
                  className="rounded-xl border border-slate-700 p-4 transition hover:border-blue-500"
                >

                  📚 Explain concepts

                </button>

              </div>

            </div>

          ) : (

            <>

              {messages.map(
                (message, index) => (

                  <ChatMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                    sources={message.sources}
                  />

                )
              )}

              {loading && (

                <ChatMessage
                  role="assistant"
                  content="KnowledgeForge is thinking..."
                />

              )}

              <div ref={messagesEndRef} />

            </>

          )}

        </div>

        <div className="mt-4">

          <ChatInput
            loading={loading}
            onSend={handleSend}
          />

        </div>

      </div>

    </div>
  );
}

export default ChatPage;