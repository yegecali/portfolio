/**
 * AdminPage — Visual configuration panel for the portfolio.
 * Access at: /portfolio/admin  (or /?admin)
 *
 * Editable fields are persisted in localStorage via adminOverrides.ts.
 * Changes take effect the next time the portfolio page loads.
 */

import React, { useState } from "react";
import {
  readAdminConfig,
  writeAdminConfig,
  clearAdminConfig,
  type AdminConfig,
  type ProjectOverrideItem,
  type ExperienceOverrideItem,
} from "@/lib/adminOverrides";
import { es } from "@/lib/i18n/es";
import { en } from "@/lib/i18n/en";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** URL of the portfolio root — strips ?admin so "Ver Portafolio" works cleanly */
function portfolioRoot(): string {
  const base = import.meta.env.BASE_URL || "/";
  return base;
}

// ── Small UI primitives ───────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100 px-3 py-2 text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-y
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        placeholder:text-gray-400 dark:placeholder:text-gray-600"
    />
  );
}

function SaveButton({
  onClick,
  saved,
}: {
  onClick: () => void;
  saved: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
        saved
          ? "bg-green-500 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {saved ? "✓ Guardado" : "Guardar cambios"}
    </button>
  );
}

function SectionCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h2 className="font-bold text-gray-900 dark:text-white text-base">{title}</h2>
        {badge && (
          <span className="ml-auto text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ReadOnlyChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
      {label}
    </span>
  );
}

function LangTab({
  lang,
  active,
  onClick,
}: {
  lang: "es" | "en";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
        active
          ? "bg-blue-600 text-white shadow"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      }`}
    >
      {lang === "es" ? "🇵🇪 Español" : "🇺🇸 English"}
    </button>
  );
}

// ── Section: Personal Info ────────────────────────────────────────────────────

function PersonalSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const p = cfg.personal ?? {};
  const [siteName, setSiteName] = useState(p.siteName ?? "Yemi Genderson");
  const [siteDescription, setSiteDescription] = useState(
    p.siteDescription ?? "Full Stack Developer"
  );
  const [email, setEmail] = useState(p.email ?? "yemi@example.com");
  const [phone, setPhone] = useState(p.phone ?? "+51 (123) 456-7890");
  const [location, setLocation] = useState(p.location ?? "Lima, Peru");
  const [cvUrl, setCvUrl] = useState(
    p.cvUrl ?? "/portfolio/cv-yemi-genderson.pdf"
  );
  const [heroImage, setHeroImage] = useState(
    p.heroImage ??
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
  );
  const [saved, setSaved] = useState(false);

  const hasOverrides = Object.keys(cfg.personal ?? {}).length > 0;

  function handleSave() {
    onSave({
      ...cfg,
      personal: { siteName, siteDescription, email, phone, location, cvUrl, heroImage },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <SectionCard
      icon="👤"
      title="Información Personal"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Nombre completo</Label>
          <Input value={siteName} onChange={setSiteName} placeholder="Yemi Genderson" />
        </div>
        <div>
          <Label>Rol / Título profesional</Label>
          <Input value={siteDescription} onChange={setSiteDescription} placeholder="Full Stack Developer" />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={email} onChange={setEmail} placeholder="email@example.com" type="email" />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input value={phone} onChange={setPhone} placeholder="+51 (123) 456-7890" />
        </div>
        <div>
          <Label>Ubicación</Label>
          <Input value={location} onChange={setLocation} placeholder="Lima, Peru" />
        </div>
        <div>
          <Label>URL del CV</Label>
          <Input value={cvUrl} onChange={setCvUrl} placeholder="/portfolio/cv.pdf" />
        </div>
      </div>
      <div className="mb-5">
        <Label>URL de la foto de perfil (Hero)</Label>
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <Input
              value={heroImage}
              onChange={setHeroImage}
              placeholder="https://..."
            />
          </div>
          {heroImage && (
            <img
              src={heroImage}
              alt="preview"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
      </div>
      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Section: Social Links ─────────────────────────────────────────────────────

function SocialSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const s = cfg.social ?? {};
  const [github, setGithub] = useState(
    s.github ?? "https://github.com/yemigenderson"
  );
  const [linkedin, setLinkedin] = useState(
    s.linkedin ?? "https://linkedin.com/in/yemigenderson"
  );
  const [whatsapp, setWhatsapp] = useState(
    s.whatsapp ?? "https://wa.me/51987654321"
  );
  const [instagram, setInstagram] = useState(
    s.instagram ?? "https://instagram.com/yemigenderson"
  );
  const [saved, setSaved] = useState(false);

  const hasOverrides = Object.keys(cfg.social ?? {}).length > 0;

  function handleSave() {
    onSave({ ...cfg, social: { github, linkedin, whatsapp, instagram } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <SectionCard
      icon="🔗"
      title="Redes Sociales"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <Label>GitHub URL</Label>
          <Input value={github} onChange={setGithub} placeholder="https://github.com/..." />
        </div>
        <div>
          <Label>LinkedIn URL</Label>
          <Input value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/in/..." />
        </div>
        <div>
          <Label>WhatsApp URL</Label>
          <Input value={whatsapp} onChange={setWhatsapp} placeholder="https://wa.me/..." />
        </div>
        <div>
          <Label>Instagram URL</Label>
          <Input value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
        </div>
      </div>
      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Section: Hero Content ─────────────────────────────────────────────────────

function HeroSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const [activeLang, setActiveLang] = useState<"es" | "en">("es");
  const [saved, setSaved] = useState(false);

  const defaultEs = es.hero;
  const defaultEn = en.hero;

  const ovrEs = cfg.hero?.es ?? {};
  const ovrEn = cfg.hero?.en ?? {};

  const [esFields, setEsFields] = useState({
    badge: ovrEs.badge ?? defaultEs.badge,
    title: ovrEs.title ?? defaultEs.title,
    description: ovrEs.description ?? defaultEs.description,
    location: ovrEs.location ?? defaultEs.location,
    status: ovrEs.status ?? defaultEs.status,
  });
  const [enFields, setEnFields] = useState({
    badge: ovrEn.badge ?? defaultEn.badge,
    title: ovrEn.title ?? defaultEn.title,
    description: ovrEn.description ?? defaultEn.description,
    location: ovrEn.location ?? defaultEn.location,
    status: ovrEn.status ?? defaultEn.status,
  });

  const hasOverrides =
    Object.keys(cfg.hero?.es ?? {}).length > 0 ||
    Object.keys(cfg.hero?.en ?? {}).length > 0;

  function patchEs(k: keyof typeof esFields, v: string) {
    setEsFields((prev) => ({ ...prev, [k]: v }));
  }
  function patchEn(k: keyof typeof enFields, v: string) {
    setEnFields((prev) => ({ ...prev, [k]: v }));
  }

  function handleSave() {
    onSave({ ...cfg, hero: { es: esFields, en: enFields } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const fields = activeLang === "es" ? esFields : enFields;
  const patch = activeLang === "es" ? patchEs : patchEn;
  const defaults = activeLang === "es" ? defaultEs : defaultEn;

  return (
    <SectionCard
      icon="🦸"
      title="Contenido del Hero"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="flex gap-2 mb-5">
        <LangTab lang="es" active={activeLang === "es"} onClick={() => setActiveLang("es")} />
        <LangTab lang="en" active={activeLang === "en"} onClick={() => setActiveLang("en")} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Badge / Etiqueta</Label>
          <Input
            value={fields.badge}
            onChange={(v) => patch("badge", v)}
            placeholder={defaults.badge}
          />
        </div>
        <div>
          <Label>Estado de disponibilidad</Label>
          <Input
            value={fields.status}
            onChange={(v) => patch("status", v)}
            placeholder={defaults.status}
          />
        </div>
        <div>
          <Label>Ubicación en hero</Label>
          <Input
            value={fields.location}
            onChange={(v) => patch("location", v)}
            placeholder={defaults.location}
          />
        </div>
      </div>
      <div className="mb-3">
        <Label>Título principal (H1)</Label>
        <Input
          value={fields.title}
          onChange={(v) => patch("title", v)}
          placeholder={defaults.title}
        />
      </div>
      <div className="mb-5">
        <Label>Descripción</Label>
        <Textarea
          value={fields.description}
          onChange={(v) => patch("description", v)}
          placeholder={defaults.description}
          rows={3}
        />
      </div>
      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Section: About Content ────────────────────────────────────────────────────

function AboutSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const [activeLang, setActiveLang] = useState<"es" | "en">("es");
  const [saved, setSaved] = useState(false);

  const defaultEs = es.about;
  const defaultEn = en.about;

  const ovrEs = cfg.about?.es ?? {};
  const ovrEn = cfg.about?.en ?? {};

  const [esFields, setEsFields] = useState({
    paragraph0: ovrEs.paragraph0 ?? defaultEs.paragraphs[0] ?? "",
    paragraph1: ovrEs.paragraph1 ?? defaultEs.paragraphs[1] ?? "",
    paragraph2: ovrEs.paragraph2 ?? defaultEs.paragraphs[2] ?? "",
    closing: ovrEs.closing ?? defaultEs.closing,
  });
  const [enFields, setEnFields] = useState({
    paragraph0: ovrEn.paragraph0 ?? defaultEn.paragraphs[0] ?? "",
    paragraph1: ovrEn.paragraph1 ?? defaultEn.paragraphs[1] ?? "",
    paragraph2: ovrEn.paragraph2 ?? defaultEn.paragraphs[2] ?? "",
    closing: ovrEn.closing ?? defaultEn.closing,
  });

  const hasOverrides =
    Object.keys(cfg.about?.es ?? {}).length > 0 ||
    Object.keys(cfg.about?.en ?? {}).length > 0;

  function patchEs(k: keyof typeof esFields, v: string) {
    setEsFields((prev) => ({ ...prev, [k]: v }));
  }
  function patchEn(k: keyof typeof enFields, v: string) {
    setEnFields((prev) => ({ ...prev, [k]: v }));
  }

  function handleSave() {
    onSave({ ...cfg, about: { es: esFields, en: enFields } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const fields = activeLang === "es" ? esFields : enFields;
  const patch = activeLang === "es" ? patchEs : patchEn;

  return (
    <SectionCard
      icon="📝"
      title="Sección Sobre Mí"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="flex gap-2 mb-5">
        <LangTab lang="es" active={activeLang === "es"} onClick={() => setActiveLang("es")} />
        <LangTab lang="en" active={activeLang === "en"} onClick={() => setActiveLang("en")} />
      </div>

      <div className="space-y-4 mb-4">
        {(["paragraph0", "paragraph1", "paragraph2"] as const).map(
          (key, i) => (
            <div key={key}>
              <Label>Párrafo {i + 1}</Label>
              <Textarea
                value={fields[key]}
                onChange={(v) => patch(key, v)}
                rows={3}
              />
            </div>
          )
        )}
        <div>
          <Label>Mensaje de cierre</Label>
          <Input
            value={fields.closing}
            onChange={(v) => patch("closing", v)}
          />
        </div>
      </div>
      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Section: Technologies (read-only) ─────────────────────────────────────────

function TechnologiesSection() {
  const techs = [
    { label: "JavaScript",  category: "Frontend"  },
    { label: "TypeScript",  category: "Frontend"  },
    { label: "React",       category: "Frontend"  },
    { label: "Tailwindcss", category: "Frontend"  },
    { label: "Vite",        category: "Frontend"  },
    { label: "Java",        category: "Backend"   },
    { label: "Spring Boot", category: "Backend"   },
    { label: "Quarkus",     category: "Backend"   },
    { label: "Node.js",     category: "Backend"   },
    { label: "Express.js",  category: "Backend"   },
    { label: "MongoDB",     category: "Databases" },
    { label: "PostgreSQL",  category: "Databases" },
    { label: "SQL Server",  category: "Databases" },
    { label: "Docker",      category: "DevOps"    },
    { label: "Linux",       category: "DevOps"    },
    { label: "Git",         category: "DevOps"    },
  ];

  const categories = ["Frontend", "Backend", "Databases", "DevOps"] as const;
  const categoryColors: Record<string, string> = {
    Frontend:  "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    Backend:   "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700",
    Databases: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700",
    DevOps:    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
  };

  return (
    <SectionCard icon="🛠️" title="Stack de Tecnologías">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Para modificar el stack, edita <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">src/contexts/PortfolioContext.tsx</code>
      </p>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat} className="flex items-start gap-3">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-lg border w-24 text-center flex-shrink-0 ${categoryColors[cat]}`}
            >
              {cat}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {techs
                .filter((t) => t.category === cat)
                .map((t) => (
                  <ReadOnlyChip key={t.label} label={t.label} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Helpers for experience/project forms ──────────────────────────────────────

function dateToYYYYMM(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

interface ProjectFormItem {
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  url: string;
  technologies: string; // comma-separated
}

interface ExperienceFormItem {
  company: string;
  positionEs: string;
  positionEn: string;
  logoAlt: string;
  summaryEs: string; // newline-separated
  summaryEn: string;
  startDate: string; // "YYYY-MM"
  endDate: string;   // "YYYY-MM" | "" = present
  currentlyWorkHere: boolean;
}

function initProjectForm(cfg: AdminConfig): ProjectFormItem[] {
  const esOvr = cfg.projects?.es;
  const enOvr = cfg.projects?.en;
  if (!esOvr && !enOvr) {
    return es.projects.map((proj, i) => {
      const enProj = en.projects[i] ?? proj;
      return {
        nameEs: proj.name,
        nameEn: enProj.name,
        descriptionEs: proj.description,
        descriptionEn: enProj.description,
        url: proj.url,
        technologies: proj.technologies.join(", "),
      };
    });
  }
  const base = esOvr ?? enOvr ?? [];
  return base.map((proj, i) => {
    const enProj = enOvr?.[i];
    return {
      nameEs: proj.name,
      nameEn: enProj?.name ?? proj.name,
      descriptionEs: proj.description,
      descriptionEn: enProj?.description ?? proj.description,
      url: proj.url,
      technologies: proj.technologies.join(", "),
    };
  });
}

function initExperienceForm(cfg: AdminConfig): ExperienceFormItem[] {
  const esOvr = cfg.experiences?.es;
  const enOvr = cfg.experiences?.en;
  if (!esOvr && !enOvr) {
    return es.experiences.map((exp, i) => {
      const enExp = en.experiences[i] ?? exp;
      return {
        company: exp.company,
        positionEs: exp.position,
        positionEn: enExp.position,
        logoAlt: exp.logoAlt,
        summaryEs: exp.summary.join("\n"),
        summaryEn: enExp.summary.join("\n"),
        startDate: dateToYYYYMM(exp.startDate),
        endDate: exp.endDate ? dateToYYYYMM(exp.endDate) : "",
        currentlyWorkHere: exp.currentlyWorkHere ?? false,
      };
    });
  }
  const base = esOvr ?? enOvr ?? [];
  return base.map((exp, i) => {
    const enExp = enOvr?.[i];
    return {
      company: exp.company,
      positionEs: exp.position,
      positionEn: enExp?.position ?? exp.position,
      logoAlt: exp.logoAlt,
      summaryEs: exp.summary.join("\n"),
      summaryEn: enExp?.summary.join("\n") ?? exp.summary.join("\n"),
      startDate: exp.startDate,
      endDate: exp.endDate ?? "",
      currentlyWorkHere: exp.currentlyWorkHere ?? false,
    };
  });
}

// ── Section: Experiences (editable) ──────────────────────────────────────────

function ExperiencesSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const [items, setItems] = useState<ExperienceFormItem[]>(() =>
    initExperienceForm(cfg)
  );
  const [activeLang, setActiveLang] = useState<"es" | "en">("es");
  const [saved, setSaved] = useState(false);

  const hasOverrides = !!(
    cfg.experiences?.es?.length || cfg.experiences?.en?.length
  );

  function updateItem(index: number, patch: Partial<ExperienceFormItem>) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        company: "",
        positionEs: "",
        positionEn: "",
        logoAlt: "",
        summaryEs: "",
        summaryEn: "",
        startDate: "",
        endDate: "",
        currentlyWorkHere: false,
      },
    ]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const toArray = (
      lang: "es" | "en"
    ): ExperienceOverrideItem[] =>
      items.map((e) => ({
        company: e.company,
        position: lang === "es" ? e.positionEs : e.positionEn,
        logoAlt: e.logoAlt,
        summary: (lang === "es" ? e.summaryEs : e.summaryEn)
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        startDate: e.startDate,
        endDate: e.endDate || undefined,
        currentlyWorkHere: e.currentlyWorkHere,
      }));

    onSave({ ...cfg, experiences: { es: toArray("es"), en: toArray("en") } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <SectionCard
      icon="💼"
      title="Experiencias Laborales"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="flex gap-2 mb-5">
        <LangTab
          lang="es"
          active={activeLang === "es"}
          onClick={() => setActiveLang("es")}
        />
        <LangTab
          lang="en"
          active={activeLang === "en"}
          onClick={() => setActiveLang("en")}
        />
      </div>

      <div className="space-y-4 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3"
          >
            {/* Card header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Experiencia {i + 1}
              </span>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Eliminar
              </button>
            </div>

            {/* Shared fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label>Empresa</Label>
                <Input
                  value={item.company}
                  onChange={(v) => updateItem(i, { company: v })}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <Label>Logo Alt</Label>
                <Input
                  value={item.logoAlt}
                  onChange={(v) => updateItem(i, { logoAlt: v })}
                  placeholder="Logo de Empresa XYZ"
                />
              </div>
            </div>

            {/* Date + currentlyWorkHere */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <Label>Inicio</Label>
                <input
                  type="month"
                  value={item.startDate}
                  onChange={(e) => updateItem(i, { startDate: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100 px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label>Fin (vacío = Presente)</Label>
                <input
                  type="month"
                  value={item.endDate}
                  onChange={(e) => updateItem(i, { endDate: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100 px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.currentlyWorkHere}
                    onChange={(e) =>
                      updateItem(i, { currentlyWorkHere: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Trabajo actual
                  </span>
                </label>
              </div>
            </div>

            {/* Translatable fields */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
              <div>
                <Label>
                  {activeLang === "es" ? "Cargo (ES)" : "Position (EN)"}
                </Label>
                <Input
                  value={
                    activeLang === "es" ? item.positionEs : item.positionEn
                  }
                  onChange={(v) =>
                    updateItem(
                      i,
                      activeLang === "es"
                        ? { positionEs: v }
                        : { positionEn: v }
                    )
                  }
                  placeholder="Backend Developer"
                />
              </div>
              <div>
                <Label>
                  {activeLang === "es"
                    ? "Resumen ES (una línea = un punto)"
                    : "Summary EN (one line = one bullet)"}
                </Label>
                <Textarea
                  value={
                    activeLang === "es" ? item.summaryEs : item.summaryEn
                  }
                  onChange={(v) =>
                    updateItem(
                      i,
                      activeLang === "es"
                        ? { summaryEs: v }
                        : { summaryEn: v }
                    )
                  }
                  rows={4}
                  placeholder={
                    activeLang === "es"
                      ? "Desarrollé APIs REST...\nOptimicé consultas SQL..."
                      : "Developed REST APIs...\nOptimized SQL queries..."
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-3 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors mb-4"
      >
        + Añadir experiencia
      </button>

      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Section: Projects (editable) ──────────────────────────────────────────────

function ProjectsSection({
  cfg,
  onSave,
}: {
  cfg: AdminConfig;
  onSave: (next: AdminConfig) => void;
}) {
  const [items, setItems] = useState<ProjectFormItem[]>(() =>
    initProjectForm(cfg)
  );
  const [activeLang, setActiveLang] = useState<"es" | "en">("es");
  const [saved, setSaved] = useState(false);

  const hasOverrides = !!(
    cfg.projects?.es?.length || cfg.projects?.en?.length
  );

  function updateItem(index: number, patch: Partial<ProjectFormItem>) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        nameEs: "",
        nameEn: "",
        descriptionEs: "",
        descriptionEn: "",
        url: "",
        technologies: "",
      },
    ]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const toArray = (lang: "es" | "en"): ProjectOverrideItem[] =>
      items.map((p) => ({
        name: lang === "es" ? p.nameEs : p.nameEn,
        description: lang === "es" ? p.descriptionEs : p.descriptionEn,
        url: p.url,
        technologies: p.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      }));

    onSave({ ...cfg, projects: { es: toArray("es"), en: toArray("en") } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <SectionCard
      icon="🚀"
      title="Proyectos Destacados"
      badge={hasOverrides ? "Modificado" : undefined}
    >
      <div className="flex gap-2 mb-5">
        <LangTab
          lang="es"
          active={activeLang === "es"}
          onClick={() => setActiveLang("es")}
        />
        <LangTab
          lang="en"
          active={activeLang === "en"}
          onClick={() => setActiveLang("en")}
        />
      </div>

      <div className="space-y-4 mb-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3"
          >
            {/* Card header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Proyecto {i + 1}
              </span>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                Eliminar
              </button>
            </div>

            {/* Translatable fields */}
            <div>
              <Label>
                {activeLang === "es" ? "Nombre (ES)" : "Name (EN)"}
              </Label>
              <Input
                value={activeLang === "es" ? item.nameEs : item.nameEn}
                onChange={(v) =>
                  updateItem(
                    i,
                    activeLang === "es" ? { nameEs: v } : { nameEn: v }
                  )
                }
                placeholder="Nombre del proyecto"
              />
            </div>
            <div>
              <Label>
                {activeLang === "es"
                  ? "Descripción (ES)"
                  : "Description (EN)"}
              </Label>
              <Textarea
                value={
                  activeLang === "es"
                    ? item.descriptionEs
                    : item.descriptionEn
                }
                onChange={(v) =>
                  updateItem(
                    i,
                    activeLang === "es"
                      ? { descriptionEs: v }
                      : { descriptionEn: v }
                  )
                }
                rows={2}
                placeholder="Descripción breve del proyecto..."
              />
            </div>

            {/* Shared fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <div>
                <Label>URL del proyecto</Label>
                <Input
                  value={item.url}
                  onChange={(v) => updateItem(i, { url: v })}
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <Label>Tecnologías (separadas por coma)</Label>
                <Input
                  value={item.technologies}
                  onChange={(v) => updateItem(i, { technologies: v })}
                  placeholder="React, Node.js, PostgreSQL"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl py-3 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors mb-4"
      >
        + Añadir proyecto
      </button>

      <SaveButton onClick={handleSave} saved={saved} />
    </SectionCard>
  );
}

// ── Main AdminPage ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [cfg, setCfg] = useState<AdminConfig>(readAdminConfig);
  const [resetConfirm, setResetConfirm] = useState(false);

  function handleSave(next: AdminConfig) {
    writeAdminConfig(next);
    setCfg(next);
  }

  function handleResetAll() {
    if (!resetConfirm) {
      setResetConfirm(true);
      setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    clearAdminConfig();
    setCfg({});
    setResetConfirm(false);
  }

  const hasAnyOverride =
    Object.keys(cfg.personal ?? {}).length > 0 ||
    Object.keys(cfg.social ?? {}).length > 0 ||
    Object.keys(cfg.hero?.es ?? {}).length > 0 ||
    Object.keys(cfg.hero?.en ?? {}).length > 0 ||
    Object.keys(cfg.about?.es ?? {}).length > 0 ||
    Object.keys(cfg.about?.en ?? {}).length > 0 ||
    (cfg.projects?.es?.length ?? 0) > 0 ||
    (cfg.experiences?.es?.length ?? 0) > 0;

  return (
    <div
      style={{ width: "100vw", maxWidth: "100vw", overflowX: "clip" }}
      className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
    >
      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          {/* Logo / title */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              ⚙
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm">
              Panel Admin
            </span>
            <span className="hidden sm:inline text-gray-400 dark:text-gray-500 text-xs">
              — Portfolio Config
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {hasAnyOverride && (
              <button
                onClick={handleResetAll}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  resetConfirm
                    ? "bg-red-600 text-white"
                    : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {resetConfirm ? "¿Confirmar reset?" : "Restablecer todo"}
              </button>
            )}
            <a
              href={portfolioRoot()}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Ver Portafolio →
            </a>
          </div>
        </div>
      </header>

      {/* ── Info banner ──────────────────────────────────────────────────────── */}
      <div className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-3">
          <span className="text-blue-500 text-lg flex-shrink-0 mt-0.5">ℹ️</span>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            Los cambios se guardan en <strong>localStorage</strong> del navegador.
            Para que se reflejen en el portafolio, guarda los cambios y luego haz clic en{" "}
            <strong>Ver Portafolio</strong>. Los cambios <strong>no se pierden</strong> al
            recargar la página, pero son específicos a este navegador.
          </p>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Overview chips */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Secciones:
          </span>
          {[
            "Información Personal",
            "Redes Sociales",
            "Hero",
            "Sobre Mí",
            "Tecnologías",
            "Experiencias",
            "Proyectos",
          ].map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-0.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Editable sections */}
        <PersonalSection cfg={cfg} onSave={handleSave} />
        <SocialSection cfg={cfg} onSave={handleSave} />
        <HeroSection cfg={cfg} onSave={handleSave} />
        <AboutSection cfg={cfg} onSave={handleSave} />

        {/* Read-only sections */}
        <TechnologiesSection />
        <ExperiencesSection cfg={cfg} onSave={handleSave} />
        <ProjectsSection cfg={cfg} onSave={handleSave} />

        {/* Bottom CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">
          <p className="font-bold text-lg mb-1">¿Listo para publicar?</p>
          <p className="text-blue-100 text-sm mb-4">
            Guarda todos los cambios y revisa tu portafolio actualizado.
          </p>
          <a
            href={portfolioRoot()}
            className="inline-block px-6 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Ver Portafolio →
          </a>
        </div>
      </main>
    </div>
  );
}
