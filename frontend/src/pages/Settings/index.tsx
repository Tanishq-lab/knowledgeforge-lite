import {
  Bot,
  Database,
  Info,
  LogOut,
  Shield,
  Cpu,
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
    <div className="mx-auto max-w-5xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account and view KnowledgeForge configuration.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Account */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <Shield className="h-6 w-6 text-blue-400" />

            <h2 className="text-xl font-semibold">
              Account
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Status
              </span>

              <span className="font-medium text-green-400">
                Logged In
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Authentication
              </span>

              <span>
                JWT
              </span>

            </div>

          </div>

        </div>

        {/* AI */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <Bot className="h-6 w-6 text-purple-400" />

            <h2 className="text-xl font-semibold">
              AI Configuration
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Provider
              </span>

              <span>
                OpenRouter
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Model
              </span>

              <span>
                Gemma 3 27B
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Embeddings
              </span>

              <span>
                all-MiniLM-L6-v2
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Retrieval
              </span>

              <span>
                Top-K = 6
              </span>

            </div>

          </div>

        </div>

        {/* Stack */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <Database className="h-6 w-6 text-green-400" />

            <h2 className="text-xl font-semibold">
              Tech Stack
            </h2>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Frontend
              </span>

              <span>
                React + TypeScript
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Backend
              </span>

              <span>
                FastAPI
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Database
              </span>

              <span>
                PostgreSQL
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Vector Store
              </span>

              <span>
                ChromaDB
              </span>

            </div>

          </div>

        </div>

        {/* About */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-3">

            <Info className="h-6 w-6 text-yellow-400" />

            <h2 className="text-xl font-semibold">
              About
            </h2>

          </div>

          <p className="font-medium">
            KnowledgeForge v1.0
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            AI-powered document intelligence platform built using
            Retrieval-Augmented Generation (RAG), ChromaDB,
            Sentence Transformers, FastAPI and OpenRouter.
          </p>

        </div>

      </div>

      <div className="rounded-2xl border border-red-900 bg-red-950/20 p-6">

        <div className="mb-4 flex items-center gap-3">

          <Cpu className="h-6 w-6 text-red-400" />

          <h2 className="text-xl font-semibold">
            Session
          </h2>

        </div>

        <p className="mb-5 text-slate-400">
          Logout from your current session.
        </p>

        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>

      </div>

    </div>
  );
}

export default SettingsPage;