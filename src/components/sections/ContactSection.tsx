import { useState } from "react";
import { Copy, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import SocialIcons from "@/components/data-display/SocialIcons";
import Typography from "@/components/general/Typography";
import Container from "@/components/layout/Container";
import Card from "@/components/layout/Card";
import { copyTextToClipboard } from "@/lib/utils";
import { usePortfolio } from "@/hooks/usePortfolio";

type CopyValue = "email" | "phone";

const ContactSection = () => {
  const { email, phone } = usePortfolio();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState<CopyValue | null>(
    null,
  );

  const handleCopyClick = async (text: string, type: CopyValue) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);
      const timeoutId = setTimeout(() => {
        setIsCopied(false);
        setCopiedValueType(null);
        clearTimeout(timeoutId);
      }, 1500);
    } catch {
      setIsCopied(false);
      setCopiedValueType(null);
      alert("Unable to copy!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Container
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center py-16"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 mb-16 relative text-center"
      >
        <div className="absolute -inset-20 bg-gradient-to-b from-blue-500/5 via-purple-500/5 to-transparent rounded-3xl blur-3xl -z-10" />

        <Typography
          variant="h1"
          className="text-5xl md:text-6xl font-bold text-center leading-tight"
        >
          <span className="block text-gray-900 dark:text-white drop-shadow-lg">
            Hablemos
          </span>
          <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Sobre tu Próximo Proyecto
          </span>
        </Typography>
        <Typography className="max-w-3xl text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Siempre estoy disponible para nuevos desafíos y oportunidades de
          colaboración. Contáctame a través de cualquiera de estos canales.
        </Typography>
      </motion.div>

      {/* Contact Methods */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
        >
          {/* Email Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full flex flex-col bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800/50 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
              <div className="h-1 bg-gradient-to-r from-blue-400 to-cyan-400" />
              <div className="flex flex-col gap-6 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Typography variant="h3" className="font-bold">
                    Email
                  </Typography>
                </div>
                <div className="flex flex-col gap-3">
                  <Typography className="text-blue-600 dark:text-blue-300 font-semibold break-all">
                    {email}
                  </Typography>
                  <button
                    onClick={() => handleCopyClick(email, "email")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors font-medium w-fit"
                  >
                    <Copy className="h-4 w-4" />
                    {isCopied && copiedValueType === "email"
                      ? "¡Copiado!"
                      : "Copiar"}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Phone Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/50 hover:border-purple-400 dark:hover:border-purple-600 transition-all">
              <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400" />
              <div className="flex flex-col gap-6 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                    <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <Typography variant="h3" className="font-bold">
                    Teléfono
                  </Typography>
                </div>
                <div className="flex flex-col gap-3">
                  <Typography className="text-purple-600 dark:text-purple-300 font-semibold">
                    {phone}
                  </Typography>
                  <button
                    onClick={() =>
                      handleCopyClick(phone.replace(/\s/g, ""), "phone")
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg transition-colors font-medium w-fit"
                  >
                    <Copy className="h-4 w-4" />
                    {isCopied && copiedValueType === "phone"
                      ? "¡Copiado!"
                      : "Copiar"}
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Social Networks Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full flex flex-col items-center gap-8"
      >
        <div className="flex flex-col items-center gap-3">
          <Typography variant="h2" className="font-bold">
            Sígueme en Redes Sociales
          </Typography>
          <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </div>
        <div className="flex justify-center">
          <SocialIcons />
        </div>
      </motion.div>
    </Container>
  );
};

export default ContactSection;
