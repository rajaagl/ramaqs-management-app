import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatusBadge, ProgressBar, AvatarStack, Section } from "@/components/ui-bits";
import { projects, formatCurrency } from "@/lib/mock-data";
import { Plus, Filter, LayoutGrid, List as ListIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/projets")({
  component: ProjetsPage,
});

function ProjetsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <AppShell
      title="Projets"
      subtitle={`${projects.length} projets · pilotage centralisé`}
      actions={
        <>
          <div className="hidden sm:flex rounded-lg border border-border bg-card p-0.5">
            <button onClick={() => setView("grid")} className={`h-8 w-8 grid place-items-center rounded ${view === "grid" ? "bg-primary-soft text-primary" : "text-muted-foreground"}`}>
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button onClick={() => setView("list")} className={`h-8 w-8 grid place-items-center rounded ${view === "list" ? "bg-primary-soft text-primary" : "text-muted-foreground"}`}>
              <ListIcon className="h-4 w-4" />
            </button>
          </div>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card text-sm hover:bg-muted">
            <Filter className="h-4 w-4" /> Filtres
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Nouveau projet
          </button>
        </>
      }
    >
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition group">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-muted-foreground">{p.code}</div>
                  <h3 className="font-semibold mt-1 group-hover:text-primary transition truncate">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{p.client}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Avancement</span>
                  <span className="font-semibold">{p.progress}%</span>
                </div>
                <ProgressBar
                  value={p.progress}
                  accent={p.health === "critique" ? "destructive" : p.health === "vigilant" ? "warning" : "primary"}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Budget</div>
                  <div className="font-medium mt-0.5">{formatCurrency(p.budget)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Consommé</div>
                  <div className="font-medium mt-0.5">{formatCurrency(p.spent)}</div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <AvatarStack items={p.team} />
                <span className="text-xs text-muted-foreground">{p.domain}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Section title="Tous les projets">
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground uppercase tracking-wide">
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3">Projet</th>
                  <th className="text-left px-3 py-3">Statut</th>
                  <th className="text-left px-3 py-3 hidden md:table-cell">Manager</th>
                  <th className="text-left px-3 py-3">Avancement</th>
                  <th className="text-right px-3 py-3 hidden lg:table-cell">Budget</th>
                  <th className="text-left px-5 py-3 hidden lg:table-cell">Équipe</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.code} · {p.client}</div>
                    </td>
                    <td className="px-3 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-3 py-3 hidden md:table-cell text-muted-foreground">{p.manager}</td>
                    <td className="px-3 py-3 min-w-[160px]">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={p.progress} accent={p.health === "critique" ? "destructive" : "primary"} />
                        <span className="text-xs font-semibold w-8">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-right hidden lg:table-cell font-medium">{formatCurrency(p.budget)}</td>
                    <td className="px-5 py-3 hidden lg:table-cell"><AvatarStack items={p.team} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </AppShell>
  );
}
