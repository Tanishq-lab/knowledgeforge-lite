import { FileText, User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Source {
  document_name: string;
  document_id: number;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

function ChatMessage({
  role,
  content,
  sources = [],
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-2xl px-5 py-4 shadow-md ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <div className="mb-4 flex items-center gap-2">
          {isUser ? (
            <>
              <User className="h-4 w-4" />
              <span className="text-sm font-semibold">
                You
              </span>
            </>
          ) : (
            <>
              <Bot className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-blue-400">
                KnowledgeForge
              </span>
            </>
          )}
        </div>

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-200 prose-li:text-slate-200 prose-strong:text-white prose-code:text-blue-300">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {!isUser && sources.length > 0 && (
          <div className="mt-6 border-t border-slate-700 pt-4">
            <p className="mb-3 text-sm font-semibold text-slate-300">
              📚 Sources
            </p>

            <div className="flex flex-wrap gap-2">
              {sources.map((source) => (
                <div
                  key={source.document_id}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300"
                >
                  <FileText className="h-4 w-4 text-blue-400" />

                  <span>{source.document_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;