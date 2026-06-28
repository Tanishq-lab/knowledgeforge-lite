import { BrainCircuit } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-blue-600 p-2">
        <BrainCircuit className="h-6 w-6 text-white" />
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight">
          KnowledgeForge
        </h1>

        <p className="text-xs text-slate-400">
          AI Knowledge Assistant
        </p>
      </div>
    </div>
  );
}

export default Logo;