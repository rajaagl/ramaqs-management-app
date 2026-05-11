import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Avatar, ProgressBar, Section, StatCard } from "@/components/ui-bits";
import { resources } from "@/lib/mock-data";
import { Users, Sparkles, Plus, Briefcase, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/ressources")({
  component: RessourcesPage,
});

function RessourcesPage() {
  const avgWorkload = Math.round(resources.reduce((s, r) => s + r.workload, 0) / resources.length);
  const overloaded = resources.filter((r) => r.workload > 85).length;

  return (
    <AppShell
      title="Ressources"
      subtitle="Équipes, compétences et plan de charge"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-sm">
          <Plus className="h-4 w-4" /> Ajouter une ressource
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard label="Consultants" value={resources.length} icon={<Users className="h-5 w-5" />} accent="primary" />
        <StatCard label="Charge moyenne" value={`${avgWorkload}%`} icon={<Briefcase className="h-5 w-5" />} accent="info" />
        <StatCard label="Surchargés" value={overloaded} sublabel=">85% de charge" icon={<TrendingUp className="h-5 w-5" />} accent="warning" />
        <StatCard label="Reco IA" value="3" sublabel="réallocations suggérées" icon={<Sparkles className="h-5 w-5" />} accent="success" />
      </div>

      <Section title="Équipe RAMAQS" description="Disponibilité & compétences">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {resources.map((r) => (
            <div key={r.id} className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/40">
              <Avatar initials={r.initials} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-sm truncate">{r.name}</div>
                  <span className="text-xs text-muted-foreground">{r.hourlyRate}€/h</span>
                </div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {r.skills.map((s) => (
                    <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-primary-soft text-primary font-medium">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-muted-foreground">Charge</span>
                    <span className={`font-semibold ${r.workload > 85 ? "text-destructive" : r.workload > 70 ? "text-warning-foreground" : "text-success"}`}>
                      {r.workload}%
                    </span>
                  </div>
                  <ProgressBar
                    value={r.workload}
                    accent={r.workload > 85 ? "destructive" : r.workload > 70 ? "warning" : "success"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </AppShell>
  );
}
