import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Section, StatCard, ProgressBar } from "@/components/ui-bits";
import { projects, monthlyRevenue, formatCurrency } from "@/lib/mock-data";
import { Wallet, TrendingUp, FileText, Download } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/app/finance")({
  component: FinancePage,
});

function FinancePage() {
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const margin = Math.round(((totalBudget - totalSpent) / totalBudget) * 100);

  return (
    <AppShell
      title="Suivi financier"
      subtitle="Budgets, coûts et rentabilité par projet"
      actions={
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-border bg-card text-sm hover:bg-muted">
          <Download className="h-4 w-4" /> Export Excel
        </button>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard label="Budget total" value={formatCurrency(totalBudget)} icon={<Wallet className="h-5 w-5" />} accent="primary" />
        <StatCard label="Coûts engagés" value={formatCurrency(totalSpent)} sublabel={`${Math.round((totalSpent/totalBudget)*100)}% du budget`} icon={<TrendingUp className="h-5 w-5" />} accent="info" />
        <StatCard label="Marge prévisionnelle" value={`${margin}%`} icon={<FileText className="h-5 w-5" />} accent={margin > 20 ? "success" : "warning"} />
        <StatCard label="Factures en attente" value="7" sublabel={formatCurrency(184000)} icon={<FileText className="h-5 w-5" />} accent="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Revenus vs coûts" description="Évolution mensuelle (k€)">
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="revenu" fill="var(--chart-1)" radius={[6, 6, 0, 0]} name="Revenu" />
                  <Bar dataKey="cout" fill="var(--chart-3)" radius={[6, 6, 0, 0]} name="Coût" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        <Section title="Top consommation" description="Budget consommé / projet">
          <div className="space-y-3">
            {[...projects].sort((a, b) => b.spent / b.budget - a.spent / a.budget).slice(0, 5).map((p) => {
              const pct = Math.round((p.spent / p.budget) * 100);
              return (
                <div key={p.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium truncate">{p.code}</span>
                    <span className={`font-semibold ${pct > 90 ? "text-destructive" : pct > 75 ? "text-warning-foreground" : "text-foreground"}`}>{pct}%</span>
                  </div>
                  <ProgressBar value={pct} accent={pct > 90 ? "destructive" : pct > 75 ? "warning" : "primary"} />
                  <div className="text-[10px] text-muted-foreground mt-1">{formatCurrency(p.spent)} / {formatCurrency(p.budget)}</div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      <div className="mt-4">
        <Section title="Rentabilité par projet">
          <div className="overflow-x-auto -mx-5 -mb-5">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground tracking-wide">
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3">Projet</th>
                  <th className="text-right px-3 py-3">Budget</th>
                  <th className="text-right px-3 py-3">Consommé</th>
                  <th className="text-right px-3 py-3">Reste</th>
                  <th className="text-right px-5 py-3">Marge prév.</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => {
                  const reste = p.budget - p.spent;
                  const m = Math.round((reste / p.budget) * 100);
                  return (
                    <tr key={p.id} className="border-b border-border hover:bg-muted/40">
                      <td className="px-5 py-3">
                        <div className="font-medium">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.code}</div>
                      </td>
                      <td className="px-3 py-3 text-right font-medium">{formatCurrency(p.budget)}</td>
                      <td className="px-3 py-3 text-right">{formatCurrency(p.spent)}</td>
                      <td className="px-3 py-3 text-right">{formatCurrency(reste)}</td>
                      <td className={`px-5 py-3 text-right font-semibold ${m < 10 ? "text-destructive" : m < 25 ? "text-warning-foreground" : "text-success"}`}>{m}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
