import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, FolderKanban, ListChecks, Users, Wallet, Sparkles,
  AlertTriangle, FileText, Building2, MessageSquare, Settings, Search, Bell,
} from "lucide-react";
import { ReactNode } from "react";

const nav = [
  { to: "/app", label: "Tableau de bord", icon: LayoutDashboard },
  { to: "/app/projets", label: "Projets", icon: FolderKanban },
  { to: "/app/taches", label: "Tâches", icon: ListChecks },
  { to: "/app/ressources", label: "Ressources", icon: Users },
  { to: "/app/finance", label: "Finance", icon: Wallet },
  { to: "/app/ia", label: "Intelligence IA", icon: Sparkles, badge: "4" },
  { to: "/app/risques", label: "Risques", icon: AlertTriangle },
  { to: "/app/documents", label: "Documents", icon: FileText },
  { to: "/app/clients", label: "Clients", icon: Building2 },
  { to: "/app/messagerie", label: "Messagerie", icon: MessageSquare },
];

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode; title: string; subtitle?: string; actions?: ReactNode;
}) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="h-16 flex items-center gap-2 px-5 border-b border-sidebar-border">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
            <span className="text-primary-foreground font-bold text-sm">R</span>
          </div>
          <div>
            <div className="font-semibold text-sidebar-foreground leading-tight">RAMAQS</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Consulting OS</div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {nav.map((item) => {
            const active = item.to === "/app" ? path === "/app" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-semibold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <Link to="/app/parametres" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/60">
            <Settings className="h-4 w-4" />
            <span>Paramètres</span>
          </Link>
          <div className="mt-3 flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-semibold text-sm">
              SB
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">Salma Bennani</div>
              <div className="text-xs text-muted-foreground truncate">Directrice projets</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur sticky top-0 z-10">
          <div className="h-full flex items-center gap-4 px-4 lg:px-8">
            <div className="lg:hidden h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Rechercher projet, tâche, document…"
                  className="w-full h-9 rounded-lg bg-muted pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="h-9 w-9 rounded-lg hover:bg-muted grid place-items-center relative" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-semibold text-xs lg:hidden">
                SB
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 lg:px-8 py-6 lg:py-8 flex-1">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
          {children}
        </div>

        {/* Bottom nav mobile */}
        <nav className="lg:hidden sticky bottom-0 z-10 bg-card border-t border-border grid grid-cols-5 gap-1 px-2 py-2">
          {nav.slice(0, 5).map((item) => {
            const active = item.to === "/app" ? path === "/app" : path.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 py-1 rounded-md text-[10px] ${
                  active ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="truncate max-w-full">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
