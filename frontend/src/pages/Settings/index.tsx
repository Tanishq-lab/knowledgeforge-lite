import {
  Bot,
  Database,
  Info,
  LogOut,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

function SettingsPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Application information and account settings.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="h-6 w-6 text-blue-400" />

          <h2 className="text-xl font-semibold">
            Account
          </h2>
        </div>

        <div className="space-y-3 text-slate-300">
          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-medium text-green-400">
              Logged In
            </span>
          </div>

          <div className="flex justify-between">
            <span>Authentication</span>
            <span>JWT</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Bot className="h-6 w-6 text-purple-400" />

          <h2 className="text-xl font-semibold">
            AI Configuration
          </h2>
        </div>

        <div className="space-y-3 text-slate-300">
          <div className="flex justify-between">
            <span>LLM</span>
            <span>Gemini 2.5 Flash</span>
          </div>

          <div className="flex justify-between">
            <span>Embedding Model</span>
            <span>all-MiniLM-L6-v2</span>
          </div>

          <div className="flex justify-between">
            <span>Vector Store</span>
            <span>ChromaDB</span>
          </div>

          <div className="flex justify-between">
            <span>Retrieval</span>
            <span>Top-K = 3</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Database className="h-6 w-6 text-green-400" />

          <h2 className="text-xl font-semibold">
            Tech Stack
          </h2>
        </div>

        <div className="space-y-3 text-slate-300">
          <div className="flex justify-between">
            <span>Frontend</span>
            <span>React + TypeScript</span>
          </div>

          <div className="flex justify-between">
            <span>Backend</span>
            <span>FastAPI</span>
          </div>

          <div className="flex justify-between">
            <span>Database</span>
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Info className="h-6 w-6 text-yellow-400" />

          <h2 className="text-xl font-semibold">
            About
          </h2>
        </div>

        <p className="text-slate-300">
          KnowledgeForge Lite v1.0
        </p>

        <p className="mt-2 text-sm text-slate-400">
          AI-powered document intelligence platform using
          Retrieval-Augmented Generation (RAG).
        </p>
      </div>

      <Button
        variant="destructive"
        className="w-full"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}

export default SettingsPage;