import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Section } from "@/components/ui-bits";
import { documents, projects } from "@/lib/mock-data";
import { FileText, Upload, Search, Folder } from "lucide-react";

export const Route = createFileRoute("/app/documents")({
  component: DocumentsPage,
});

const typeColors: Record<string, string> = {
  PDF: "bg-destructive/10 text-destructive",
  DOCX: "bg-info/10 text-info",
  XLSX: "bg-success/10 text-success",
  PPTX: "bg-warning/15 text-warning-foreground",
  Image: "bg-primary-soft text-primary",
};

function DocumentsPage() {
  const projectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "—";

  return (
    <AppShell
      title="Documents"
      subtitle="Stockage sécurisé, versioning et recherche IA"
      actions={
        <>
          <div className="relative hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input placeholder="Recherche IA…" className="h-9 pl-9 pr-3 rounded-lg bg-card border border-border text-sm w-64 outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button className="inline-flex items-center gap-2 h-9 px-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 shadow-sm">
            <Upload className="h-4 w-4" /> Téléverser
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {["Spécifications", "Rapports", "Budgets", "Livrables"].map((f, i) => (
          <div key={f} className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition cursor-pointer">
            <Folder className="h-5 w-5 text-primary" />
            <div className="mt-2 font-medium text-sm">{f}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{12 + i * 3} fichiers</div>
          </div>
        ))}
      </div>

      <Section title="Documents récents" description={`${documents.length} fichiers`}>
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted-foreground">
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3">Nom</th>
                <th className="text-left px-3 py-3">Projet</th>
                <th className="text-left px-3 py-3 hidden md:table-cell">Version</th>
                <th className="text-left px-3 py-3 hidden lg:table-cell">Modifié par</th>
                <th className="text-right px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => (
                <tr key={d.id} className="border-b border-border hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-lg grid place-items-center text-[10px] font-bold ${typeColors[d.type]}`}>
                        {d.type}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate flex items-center gap-2">
                          <FileText className="h-3.5 w-3.5 text-muted-foreground" /> {d.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{d.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground truncate max-w-[180px]">{projectName(d.projectId)}</td>
                  <td className="px-3 py-3 hidden md:table-cell"><span className="text-xs font-mono">{d.version}</span></td>
                  <td className="px-3 py-3 hidden lg:table-cell text-muted-foreground">{d.updatedBy}</td>
                  <td className="px-5 py-3 text-right text-muted-foreground text-xs">{new Date(d.updatedAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </AppShell>
  );
}
