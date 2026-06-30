import {
  FilePlus2,
  MessageSquare,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Upload",
      icon: FilePlus2,
      path: "/documents",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      path: "/chat",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="rounded-xl border border-slate-800 p-6 transition hover:bg-slate-800"
            >
              <Icon className="mx-auto mb-3 h-8 w-8" />

              <p>{action.title}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;