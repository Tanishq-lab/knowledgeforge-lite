import { useState } from "react";
import { SendHorizontal } from "lucide-react";

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
    if (!question.trim()) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about your documents..."
        className="flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        <SendHorizontal className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ChatInput;