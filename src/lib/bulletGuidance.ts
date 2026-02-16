const ACTION_VERBS = [
  "Built",
  "Developed",
  "Designed",
  "Implemented",
  "Led",
  "Improved",
  "Created",
  "Optimized",
  "Automated",
];

export function bulletStartsWithActionVerb(bullet: string) {
  const trimmed = bullet.trim();
  if (!trimmed) return true;
  return ACTION_VERBS.some((v) => trimmed.toLowerCase().startsWith(v.toLowerCase() + " "));
}

export function bulletHasNumber(bullet: string) {
  const trimmed = bullet.trim();
  if (!trimmed) return true;
  return /\d/.test(trimmed);
}

export function extractBullets(text: string) {
  return (text ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}
