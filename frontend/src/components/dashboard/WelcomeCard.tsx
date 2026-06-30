import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-3 max-w-2xl text-slate-400">
        KnowledgeForge lets you upload PDF documents, search them using
        semantic retrieval, and chat with them using AI-powered
        Retrieval-Augmented Generation (RAG).
      </p>

      <div className="mt-8 flex gap-4">
        <Button
          onClick={() => navigate("/documents")}
        >
          My Documents
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate("/chat")}
        >
          AI Chat
        </Button>
      </div>
    </div>
  );
}

export default WelcomeCard;