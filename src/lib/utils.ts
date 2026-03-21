export function mergeClasses(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export async function copyTextToClipboard(text: string) {
  if (!navigator?.clipboard) {
    throw new Error("Clipboard API not available");
  }
  return await navigator.clipboard.writeText(text);
}
