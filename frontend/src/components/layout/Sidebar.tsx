import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings
} from "lucide-react";

import Logo from "../common/Logo";

function Sidebar() {
  const location = useLocation();

  const links = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/documents",
    },
    {
      title: "Chat",
      icon: MessageSquare,
      href: "/chat",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900 px-6 py-8">

      <Logo />

      <nav className="mt-10 space-y-2">

        {links.map((link) => {

          const Icon = link.icon;

          const active =
            location.pathname === link.href;

          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Icon className="h-5 w-5" />

              {link.title}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;