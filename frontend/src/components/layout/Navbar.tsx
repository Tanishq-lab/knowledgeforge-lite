import {
  Bell,
  Search,
  User
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Navbar() {
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

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <Input
            placeholder="Search..."
            className="w-64 pl-10"
          />

        </div>

        <Button>

          Upload PDF

        </Button>

        <Bell
          className="h-5 w-5 cursor-pointer text-slate-400"
        />

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">

          <User className="h-5 w-5 text-white" />

        </div>

      </div>

    </header>
  );
}

export default Navbar;