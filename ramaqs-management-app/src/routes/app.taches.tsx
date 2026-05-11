import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { PriorityBadge, TaskStatusBadge, ProgressBar, Avatar } from "@/components/ui-bits";
import { tasks, projects, taskStatusLabels, type TaskStatus } from "@/lib/mock-data";
import { Plus, Search } from "lucide-react";

export const Route = createFileRoute("/app/taches")({
  component: TachesPage,
});

const columns: TaskStatus[] = ["todo", "in_progress", "review", "done"];

function TachesPage() {
  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "—";

  return (
    <AppShell
      title="Tâches"
      subtitle="Vue Kanban — toutes équipes confondues"
      actions={
        <>
          <div className="relative hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Rechercher…" className="h-9 pl-9 pr-3 rounded-lg bg-card border border-border text-sm w-56 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Nouvelle tâche
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => {
          const items = tasks.filter((t) => t.status === col);
          return (
            <div key={col} className="rounded-xl bg-muted/40 border border-border p-3 min-h-[300px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    col === "todo" ? "bg-muted-foreground" :
                    col === "in_progress" ? "bg-info" :
                    col === "review" ? "bg-warning" : "bg-success"
                  }`} />
                  <h3 className="font-semibold text-sm">{taskStatusLabels[col]}</h3>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-card border border-border rounded-full px-2 py-0.5">
                  {items.length}
                </span>
              </div>
              <div className="space-y-2">
                {items.map((t) => (
                  <div key={t.id} className="rounded-lg bg-card border border-border p-3 shadow-sm hover:shadow-md transition cursor-pointer">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <PriorityBadge priority={t.priority} />
                      <span className="text-[10px] text-muted-foreground">{new Date(t.dueDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</span>
                    </div>
                    <h4 className="text-sm font-medium leading-snug">{t.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 truncate">{projectName(t.projectId)}</p>
                    {t.progress > 0 && t.progress < 100 && (
                      <div className="mt-3"><ProgressBar value={t.progress} /></div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <Avatar initials={t.assignee.split(" ").map((n) => n[0]).join("").slice(0, 2)} size="xs" />
                      <TaskStatusBadge status={t.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
