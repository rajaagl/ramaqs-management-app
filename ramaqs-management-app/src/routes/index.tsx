import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Sparkles, Brain, Factory, GraduationCap, ArrowRight, BarChart3,
  Users, Shield, Zap, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAMAQS Consulting — Plateforme de gestion de projets nouvelle génération" },
      { name: "description", content: "Centralisez, pilotez et automatisez vos projets de transformation digitale, IA, Industrie 4.0 et conseil avec l'intelligence augmentée RAMAQS." },
      { property: "og:title", content: "RAMAQS Consulting — Pilotage de projets augmenté par l'IA" },
      { property: "og:description", content: "Une plateforme unique pour centraliser, suivre en temps réel et automatiser vos projets stratégiques." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-foreground">RAMAQS</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Consulting</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#fonctionnalites" className="hover:text-foreground">Fonctionnalités</a>
            <a href="#ia" className="hover:text-foreground">Intelligence IA</a>
            <a href="#secteurs" className="hover:text-foreground">Secteurs</a>
          </nav>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm"
          >
            Accéder à la plateforme
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-soft" aria-hidden />
        <div className="absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-info/10 blur-3xl" aria-hidden />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              Nouveau · Pilotage projet augmenté par l'IA
            </span>
            <h1 className="mt-6 text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.05]">
              Pilotez tous vos projets avec
              <span className="text-gradient-primary"> intelligence et précision.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              La plateforme RAMAQS centralise vos projets de transformation digitale, IA, Industrie 4.0 et conseil.
              Coût, délai, qualité, ressources : un seul cockpit, des décisions augmentées par l'IA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition"
              >
                Ouvrir la démo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#fonctionnalites"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-border bg-card text-foreground font-medium hover:bg-muted transition"
              >
                Découvrir les modules
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {["10+ modules métier", "IA prédictive intégrée", "Multi-équipes & clients"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Mock dashboard preview */}
          <div className="mt-16 lg:mt-20 relative">
            <div className="rounded-2xl border border-border bg-card shadow-elegant overflow-hidden">
              <div className="h-9 border-b border-border bg-muted/50 flex items-center gap-1.5 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                <span className="ml-3 text-xs text-muted-foreground">platform.ramaqs.com/app</span>
              </div>
              <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
                {[
                  { l: "Projets actifs", v: "24", t: "+3 ce mois", c: "text-success" },
                  { l: "Budget global", v: "1,8 M€", t: "82% consommé", c: "text-info" },
                  { l: "Risques élevés", v: "5", t: "1 critique", c: "text-destructive" },
                  { l: "Score IA santé", v: "87/100", t: "▲ stable", c: "text-success" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-gradient-soft border border-border p-4">
                    <div className="text-xs text-muted-foreground">{s.l}</div>
                    <div className="text-2xl font-bold mt-1">{s.v}</div>
                    <div className={`text-xs mt-1 ${s.c}`}>{s.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Domaines */}
      <section id="secteurs" className="py-20 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">4 domaines d'expertise, une plateforme unifiée</h2>
          <p className="mt-4 text-muted-foreground">RAMAQS Consulting accompagne vos transformations sur l'ensemble de la chaîne de valeur.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Zap, title: "Transformation digitale", desc: "Cloud, ERP, modernisation des SI." },
            { icon: Brain, title: "Solutions IA", desc: "GenAI, NLP, vision, MLOps." },
            { icon: Factory, title: "Industrie 4.0", desc: "IoT, OT/IT, jumeaux numériques." },
            { icon: GraduationCap, title: "Conseil & formation", desc: "Stratégie, change, upskilling." },
          ].map((d) => (
            <div key={d.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
              <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary grid place-items-center">
                <d.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{d.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnalités */}
      <section id="fonctionnalites" className="py-20 bg-gradient-soft border-y border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Tout ce qu'il faut pour livrer dans les délais</h2>
            <p className="mt-4 text-muted-foreground">Une suite intégrée qui couvre 100% du cycle projet, du cadrage au bilan.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: BarChart3, title: "Pilotage temps réel", desc: "Tableaux de bord dynamiques, KPI coût/délai/qualité, exports PDF & Excel." },
              { icon: Users, title: "Collaboration fluide", desc: "Messagerie, commentaires, partage de documents et historique complet." },
              { icon: Shield, title: "Gestion des risques", desc: "Identification, scoring impact/probabilité, plans d'action et suivi." },
              { icon: Sparkles, title: "IA décisionnelle", desc: "Prédiction des retards, allocation intelligente, assistant projet." },
              { icon: Zap, title: "Automatisations", desc: "Notifications, workflows, validations, relances automatiques." },
              { icon: Brain, title: "Recherche intelligente", desc: "Retrouvez n'importe quel document, tâche ou décision en secondes." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6">
                <f.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IA */}
      <section id="ia" className="py-20 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Module IA différenciateur
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">L'IA qui anticipe, recommande et alerte.</h2>
            <p className="mt-4 text-muted-foreground">
              Notre moteur prédictif analyse vos données projet en continu pour détecter les dérives,
              optimiser l'allocation des ressources et fournir un assistant intelligent à vos chefs de projet.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Prédiction des retards avec score de probabilité",
                "Recommandation automatique d'allocation des ressources",
                "Détection précoce des risques techniques et budgétaires",
                "Assistant conversationnel par projet (chat IA)",
              ].map((i) => (
                <li key={i} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5" /> {i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card shadow-elegant p-6 space-y-3">
            {[
              { sev: "destructive", t: "Retard probable détecté", m: "RMQ-2025-004 — 78% de risque de dépasser la deadline." },
              { sev: "warning", t: "Surcharge équipe", m: "Yassine A. à 92% sur 4 semaines. Réallouer T8 ?" },
              { sev: "info", t: "Économie possible", m: "Optimisation cloud RMQ-2025-003 : -8 200 €." },
            ].map((a) => (
              <div key={a.t} className={`rounded-xl border p-4 bg-${a.sev}/5 border-${a.sev}/20`}>
                <div className="flex items-start gap-3">
                  <Sparkles className={`h-4 w-4 mt-0.5 text-${a.sev}`} />
                  <div>
                    <div className="font-medium text-sm">{a.t}</div>
                    <div className="text-xs text-muted-foreground mt-1">{a.m}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-gradient-hero p-10 lg:p-16 text-center shadow-elegant">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground tracking-tight">
              Prêt à transformer votre pilotage projet ?
            </h2>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
              Découvrez la plateforme RAMAQS Consulting en mode démo immédiate. Aucune installation, aucun compte.
            </p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-card text-foreground font-medium hover:bg-card/90 transition shadow-lg"
            >
              Lancer la démo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2025 RAMAQS Consulting. Tous droits réservés.</div>
          <div className="flex gap-6"><a href="#" className="hover:text-foreground">Mentions légales</a><a href="#" className="hover:text-foreground">Confidentialité</a><a href="#" className="hover:text-foreground">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
