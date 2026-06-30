import { FileText } from "lucide-react";

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
        className={`max-w-3xl rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "border border-slate-800 bg-slate-900 text-slate-100"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {content}
        </p>

        {!isUser && sources.length > 0 && (
          <div className="mt-5 border-t border-slate-700 pt-4">
            <p className="mb-3 text-sm font-semibold text-slate-300">
              📚 Sources
            </p>

            <div className="space-y-2">
              {sources.map((source) => (
                <div
                  key={source.document_id}
                  className="flex items-center gap-2 text-sm text-slate-400"
                >
                  <FileText className="h-4 w-4" />

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