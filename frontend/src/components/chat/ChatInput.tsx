import { useState } from "react";
import { Loader2, SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSend: (question: string) => void;
  loading: boolean;
}

function ChatInput({
  onSend,
  loading,
}: ChatInputProps) {
  const [question, setQuestion] = useState("");

  const handleSend = () => {
    if (!question.trim() || loading) return;

    onSend(question.trim());
    setQuestion("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm">

      <div className="flex items-end gap-3">

        <input
          type="text"
          value={question}
          disabled={loading}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            loading
              ? "KnowledgeForge is thinking..."
              : "Ask anything about your uploaded documents..."
          }
          className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading || !question.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </button>

      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">

        <span>
          Press <kbd className="rounded bg-slate-800 px-1.5 py-0.5">Enter</kbd> to send
        </span>

        <span>
          AI responses are generated using your uploaded documents.
        </span>

      </div>

    </div>
  );
}

export default ChatInput;