import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { StatCard, StatusBadge, ProgressBar, AvatarStack, Section } from "@/components/ui-bits";
import {
  FolderKanban, Wallet, AlertTriangle, Sparkles, TrendingUp, Plus, Download,
} from "lucide-react";
import {
  projects, monthlyRevenue, projectsByDomain, aiInsights, formatCurrency,
} from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

function Dashboard() {
  const activeProjects = projects.filter((p) => p.status === "en_cours" || p.status === "a_risque");
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const highRisks = projects.filter((p) => p.health === "critique" || p.health === "vigilant").length;

  return (
    <AppShell
      title="Tableau de bord"
      subtitle="Vue d'ensemble de l'activité — Q2 2025"
      actions={
        <>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card text-sm hover:bg-muted">
            <Download className="h-4 w-4" /> Exporter
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-sm">
            <Plus className="h-4 w-4" /> Nouveau projet
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Projets actifs" value={activeProjects.length} sublabel={`sur ${projects.length} au total`} icon={<FolderKanban className="h-5 w-5" />} accent="primary" trend={{ value: "+2 ce mois", positive: true }} />
        <StatCard label="Budget global" value={formatCurrency(totalBudget)} sublabel={`${Math.round((totalSpent / totalBudget) * 100)}% consommé`} icon={<Wallet className="h-5 w-5" />} accent="info" />
        <StatCard label="Risques élevés" value={highRisks} sublabel="dont 1 critique" icon={<AlertTriangle className="h-5 w-5" />} accent="destructive" />
        <StatCard label="Score IA santé" value="87/100" sublabel="Globalement sain" icon={<Sparkles className="h-5 w-5" />} accent="success" trend={{ value: "+4 pts", positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <Section title="Revenus & coûts" description="6 derniers mois (k€)">
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="revenu" stroke="var(--chart-1)" strokeWidth={2} fill="url(#rev)" name="Revenu" />
                  <Area type="monotone" dataKey="cout" stroke="var(--chart-3)" strokeWidth={2} fill="url(#cost)" name="Coût" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        <Section title="Répartition par domaine">
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={projectsByDomain} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={75} innerRadius={45}>
                  {projectsByDomain.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                <Legend wrapperStyle={{ fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-2">
          <Section
            title="Projets actifs"
            description="Suivi avancement & santé"
            action={<button className="text-xs text-primary hover:underline">Voir tous →</button>}
          >
            <div className="space-y-3">
              {activeProjects.slice(0, 5).map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/40 transition">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono text-muted-foreground">{p.code}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="font-medium text-sm mt-1 truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.client} · {p.domain}</div>
                  </div>
                  <div className="flex-1 max-w-[180px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Avancement</span>
                      <span className="font-semibold">{p.progress}%</span>
                    </div>
                    <ProgressBar
                      value={p.progress}
                      accent={p.health === "critique" ? "destructive" : p.health === "vigilant" ? "warning" : "primary"}
                    />
                  </div>
                  <AvatarStack items={p.team} />
                </div>
              ))}
            </div>
          </Section>
        </div>

        <Section
          title="Insights IA"
          description="Recommandations en temps réel"
          action={<Sparkles className="h-4 w-4 text-primary" />}
        >
          <div className="space-y-3">
            {aiInsights.map((i) => {
              const colors = {
                high: "bg-destructive/5 border-destructive/20",
                medium: "bg-warning/10 border-warning/30",
                low: "bg-info/5 border-info/20",
              };
              const dot = {
                high: "bg-destructive",
                medium: "bg-warning",
                low: "bg-info",
              };
              return (
                <div key={i.id} className={`rounded-lg border p-3 ${colors[i.severity]}`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${dot[i.severity]}`} />
                    <span className="text-xs font-semibold">{i.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{i.message}</p>
                </div>
              );
            })}
            <button className="w-full mt-2 inline-flex items-center justify-center gap-2 h-9 rounded-lg bg-primary-soft text-primary text-sm font-medium hover:bg-primary/10">
              <TrendingUp className="h-4 w-4" /> Ouvrir l'assistant IA
            </button>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
