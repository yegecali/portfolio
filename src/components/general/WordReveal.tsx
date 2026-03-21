import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;       // initial delay before animation starts
  stagger?: number;     // delay between each word
  duration?: number;    // each word animation duration
  once?: boolean;       // only animate once (true) or every time in view (false)
  trigger?: "inView" | "mount"; // inView = whileInView, mount = animate on mount
}

const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1], // custom easing — snappy but smooth
    },
  }),
};

const containerVariants = (delay: number, stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

/**
 * Splits text into words and reveals each one with a slide-up + fade effect.
 * Each word is wrapped in an overflow-hidden mask so it appears from behind a curtain.
 */
const WordReveal = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
  duration = 0.5,
  once = true,
  trigger = "inView",
}: WordRevealProps) => {
  const words = text.split(" ");

  const isMount = trigger === "mount";

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}
      variants={containerVariants(delay, stagger)}
      initial="hidden"
      {...(isMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once, amount: 0.5 } })}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden leading-tight"
          style={{ paddingBottom: "0.05em" }} // prevent descender clipping
        >
          <motion.span
            className="inline-block"
            custom={i}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: {
                  duration,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default WordReveal;
