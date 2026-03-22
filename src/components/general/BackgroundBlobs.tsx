import { motion, type TargetAndTransition, type Transition } from "framer-motion";

export interface BlobConfig {
  className: string;
  animate?: TargetAndTransition;
  transition?: Transition;
}

interface BackgroundBlobsProps {
  blobs: BlobConfig[];
}

/**
 * Decorative animated background blobs shared across sections.
 * Pass an array of blob configs; each renders as an animated circle.
 */
const BackgroundBlobs = ({ blobs }: BackgroundBlobsProps) => (
  <div className="absolute inset-0 pointer-events-none">
    {blobs.map((blob, i) =>
      blob.animate ? (
        <motion.div
          key={i}
          className={blob.className}
          animate={blob.animate}
          transition={blob.transition}
        />
      ) : (
        <div key={i} className={blob.className} />
      )
    )}
  </div>
);

export default BackgroundBlobs;
