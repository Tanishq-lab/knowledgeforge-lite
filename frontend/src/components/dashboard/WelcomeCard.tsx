import { Button } from "@/components/ui/button";

function WelcomeCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-slate-400">
        Upload documents, ask questions, and explore your knowledge with AI.
      </p>

      <div className="mt-8 flex gap-4">

        <Button>
          Upload Document
        </Button>

        <Button variant="secondary">
          Start Chat
        </Button>

      </div>

    </div>
  );
}

export default WelcomeCard;