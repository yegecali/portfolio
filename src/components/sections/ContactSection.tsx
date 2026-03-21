import { useState } from "react";
import { Copy, Mail, Phone, CheckCheck, Clock, Send, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import WordReveal from "@/components/general/WordReveal";
import { copyTextToClipboard } from "@/lib/utils";
import { usePortfolio } from "@/hooks/usePortfolio";

type CopyValue = "email" | "phone";

const SOCIAL_META: Record<string, { label: string; icon: React.ElementType; gradient: string; bg: string }> = {
  github: {
    label: "GitHub",
    icon: Github,
    gradient: "from-gray-700 to-gray-900",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  linkedin: {
    label: "LinkedIn",
    icon: Linkedin,
    gradient: "from-blue-600 to-blue-800",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    gradient: "from-pink-500 to-purple-600",
    bg: "bg-pink-50 dark:bg-pink-900/20",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: MessageCircle,
    gradient: "from-emerald-500 to-green-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
};

const getSocialMeta = (url: string) => {
  const lower = url.toLowerCase();
  for (const [key, meta] of Object.entries(SOCIAL_META)) {
    if (lower.includes(key)) return meta;
  }
  return null;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d } }),
};

const ContactSection = () => {
  const { email, phone, socialLinks } = usePortfolio();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState<CopyValue | null>(null);

  const handleCopy = async (text: string, type: CopyValue) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);
      setTimeout(() => { setIsCopied(false); setCopiedValueType(null); }, 2000);
    } catch {
      alert("No se pudo copiar");
    }
  };

  return (
    <Container
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 md:w-[600px] md:h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-10 md:gap-16">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Contacto
            </span>
            <div className="h-px w-8 bg-gradient-to-r from-purple-500 to-blue-500" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            <WordReveal text="Hablemos sobre tu" trigger="inView" delay={0} stagger={0.1} once={true} />
            {" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              <WordReveal text="próximo proyecto" trigger="inView" delay={0.3} stagger={0.1} once={true} />
            </span>
          </h2>
          <p className="max-w-xl text-gray-500 dark:text-gray-400 text-sm md:text-base">
            Estoy disponible para nuevos desafíos y colaboraciones. Escríbeme y te respondo pronto.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">

          {/* LEFT — Contact info */}
          <div className="flex flex-col gap-6">

            {/* Availability badge */}
            <motion.div
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            {/* Response time */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-500 dark:text-gray-400"
            >
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Tiempo de respuesta: <strong className="text-gray-700 dark:text-gray-300">menos de 24 horas</strong></span>
            </motion.div>

            {/* Contact methods */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
              className="flex flex-col gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5 shadow-sm"
            >
              {/* Email row */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-700 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">{email}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(email, "email")}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all"
                >
                  {isCopied && copiedValueType === "email"
                    ? <><CheckCheck className="w-3.5 h-3.5" /> Copiado</>
                    : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
                </button>
              </div>

              {/* Phone row */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">Teléfono</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(phone.replace(/\s/g, ""), "phone")}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all"
                >
                  {isCopied && copiedValueType === "phone"
                    ? <><CheckCheck className="w-3.5 h-3.5" /> Copiado</>
                    : <><Copy className="w-3.5 h-3.5" /> Copiar</>}
                </button>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              variants={itemVariants}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                Redes sociales
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link, i) => {
                  const meta = getSocialMeta(link.url);
                  if (!meta) return null;
                  const Icon = meta.icon;
                  return (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 ${meta.bg} hover:shadow-md transition-all duration-200`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${meta.gradient} shadow-sm`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {meta.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — CTA card */}
          <motion.div
            custom={0.25}
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            viewport={{ once: true }}
            className="relative flex flex-col justify-between gap-6 rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-blue-500/20"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl pointer-events-none" />

            {/* Content */}
            <div className="relative flex flex-col gap-6">
              <span className="text-5xl">👋</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  ¿Listo para construir algo increíble?
                </h3>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                  Ya sea un sistema bancario de alto rendimiento, una arquitectura de microservicios o una migración cloud — me encantaría ser parte del equipo.
                </p>
              </div>

              {/* Highlights */}
              <div className="flex flex-col gap-2">
                {[
                  "✅ Backend con Java, Spring Boot & Quarkus",
                  "✅ Frontend moderno con React & TypeScript",
                  "✅ Experiencia en proyectos bancarios reales",
                ].map((item, i) => (
                  <p key={i} className="text-white/90 text-sm font-medium">{item}</p>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div className="relative">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
              >
                <Send className="w-4 h-4" />
                Enviarme un mensaje
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
