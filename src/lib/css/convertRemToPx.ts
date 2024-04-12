export function convertRemToPx(rem: number): number {
  if (typeof window === "undefined") return rem * 16;
  const fontSize = getComputedStyle(document.documentElement).fontSize;
  return rem * parseFloat(fontSize);
}
