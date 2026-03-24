import { Copy, Mail, Phone, CheckCheck, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import BackgroundBlobs from "@/components/general/BackgroundBlobs";
import StatusBadge from "@/components/general/StatusBadge";
import { customDelayFadeUpVariants, sectionHeaderProps } from "@/lib/animations";
import { getSocialMeta } from "@/lib/constants";
import WordReveal from "@/components/general/WordReveal";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useI18n } from "@/hooks/useI18n";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { BRAND } from "@/lib/theme";

type CopyValue = "email" | "phone";

const ContactSection = () => {
  const { email, phone, socialLinks } = usePortfolio();
  const { t } = useI18n();
  const ui = t.ui.contact;
  const { copiedKey, copy } = useCopyToClipboard<CopyValue>();

  return (
    <Container
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-section-alt overflow-hidden"
    >
      <BackgroundBlobs
        blobs={[
          {
            className: "absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 md:w-[600px] md:h-[400px] bg-gradient-to-b from-blue-100/50 to-transparent dark:from-blue-900/10 rounded-full blur-3xl",
            animate: { scale: [1, 1.1, 1] },
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          },
          {
            className: "absolute bottom-0 right-0 w-80 h-80 bg-purple-100/40 dark:bg-purple-900/10 rounded-full blur-3xl",
            animate: { x: [0, -20, 0] },
            transition: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          },
        ]}
      />

      <div className="relative z-10 w-full flex flex-col gap-10 md:gap-16">

        {/* Header */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          {...sectionHeaderProps}
        >
          <div className="flex items-center gap-2">
            <div className={`h-px w-8 bg-gradient-to-r ${BRAND.lineGradient}`} />
            <span className={`text-xs font-semibold ${BRAND.labelText} uppercase tracking-widest`}>
              {ui.sectionLabel}
            </span>
            <div className={`h-px w-8 bg-gradient-to-r ${BRAND.lineGradient}`} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-heading leading-tight">
            <WordReveal text={ui.title1} trigger="inView" delay={0} stagger={0.1} once={true} />
            {" "}
            <span className={`bg-gradient-to-r ${BRAND.gradient} bg-clip-text text-transparent`}>
              <WordReveal text={ui.title2} trigger="inView" delay={0.3} stagger={0.1} once={true} />
            </span>
          </h2>
          <p className="max-w-xl text-subtle text-sm md:text-base">
            {ui.subtitle}
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
              variants={customDelayFadeUpVariants}
              viewport={{ once: true }}
              className="w-fit"
            >
              <StatusBadge label={ui.available} className="text-sm px-4 py-2" />
            </motion.div>

            {/* Response time */}
            <motion.div
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              variants={customDelayFadeUpVariants}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-subtle"
            >
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-sm">
                {ui.responseTime}{" "}
                <strong className="text-body">{ui.responseValue}</strong>
              </span>
            </motion.div>

            {/* Contact methods */}
            <motion.div
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              variants={customDelayFadeUpVariants}
              viewport={{ once: true }}
              className="flex flex-col gap-3 rounded-2xl border border-card-border bg-section-bg p-5 shadow-sm"
            >
              {/* Email row */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card-bg border border-card-border hover:border-blue-200 dark:hover:border-blue-700 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-faint font-medium">{ui.emailLabel}</p>
                    <p className="text-sm font-semibold text-heading truncate">{email}</p>
                  </div>
                </div>
                <button
                  onClick={() => copy(email, "email")}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all"
                >
                  {copiedKey === "email"
                    ? <><CheckCheck className="w-3.5 h-3.5" /> {ui.copied}</>
                    : <><Copy className="w-3.5 h-3.5" /> {ui.copy}</>}
                </button>
              </div>

              {/* Phone row */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-card-bg border border-card-border hover:border-purple-200 dark:hover:border-purple-700 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex-shrink-0">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-faint font-medium">{ui.phoneLabel}</p>
                    <p className="text-sm font-semibold text-heading">{phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => copy(phone.replace(/\s/g, ""), "phone")}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all"
                >
                  {copiedKey === "phone"
                    ? <><CheckCheck className="w-3.5 h-3.5" /> {ui.copied}</>
                    : <><Copy className="w-3.5 h-3.5" /> {ui.copy}</>}
                </button>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={0.4}
              initial="hidden"
              whileInView="visible"
              variants={customDelayFadeUpVariants}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <p className="text-xs font-semibold text-faint uppercase tracking-widest">
                {ui.socialLabel}
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
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-card-border ${meta.bg} hover:shadow-md transition-all duration-200`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${meta.gradient} shadow-sm`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-body">
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
            variants={customDelayFadeUpVariants}
            viewport={{ once: true }}
            className={`relative flex flex-col justify-between gap-6 rounded-2xl overflow-hidden p-6 md:p-10 bg-gradient-to-br ${BRAND.ctaGradient} via-purple-600 to-pink-600 shadow-2xl shadow-blue-500/20`}
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
                  {ui.ctaTitle}
                </h3>
                <p className="text-blue-100 text-sm md:text-base leading-relaxed">
                  {ui.ctaSubtitle}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {ui.ctaHighlights.map((item, i) => (
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
                {ui.ctaButton}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
