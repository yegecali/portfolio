import { useState } from "react";
import { copyTextToClipboard } from "@/lib/utils";
import { ANIMATION_TIMINGS } from "@/lib/constants";

/**
 * Generic copy-to-clipboard hook with typed "which item was copied" state.
 *
 * @example
 * const { copiedKey, copy } = useCopyToClipboard<"email" | "phone">();
 * copy(email, "email");
 * isCopied = copiedKey === "email";
 */
const useCopyToClipboard = <T>() => {
  const [copiedKey, setCopiedKey] = useState<T | null>(null);

  const copy = async (text: string, key: T) => {
    try {
      await copyTextToClipboard(text);
      setCopiedKey(key);
      setTimeout(
        () => setCopiedKey(null),
        ANIMATION_TIMINGS.COPY_NOTIFICATION
      );
    } catch {
      alert("No se pudo copiar");
    }
  };

  return { copiedKey, copy };
};

export default useCopyToClipboard;
