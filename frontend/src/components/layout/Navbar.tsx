import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Settings } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { token, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const accountName = token ? "Account" : "Guest";

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-8 py-5">
      <div>
        <h2 className="text-2xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-slate-400">
          Ask anything about your documents.
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 transition hover:border-slate-500 hover:bg-slate-800"
        >
          <span className="text-sm font-medium">
            {accountName}
          </span>

          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-xl">
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 transition hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-400 transition hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;