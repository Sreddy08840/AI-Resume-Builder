import type { AtsResult } from "@/lib/atsScore";

function colorForBand(band: AtsResult["band"]["color"]) {
  if (band === "red") return "#dc2626";
  if (band === "amber") return "#d97706";
  return "#16a34a";
}

export function AtsScoreCircle({ result }: { result: AtsResult }) {
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, result.score));
  const dash = (pct / 100) * c;

  const color = colorForBand(result.band.color);

  return (
    <div className="flex items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="block">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="transparent"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="transparent"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c - dash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold tabular-nums">{result.score}</div>
          <div className="mt-1 text-xs font-semibold" style={{ color }}>
            {result.band.label}
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm font-semibold tracking-tight">ATS Resume Score</div>
        <div className="mt-1 text-xs text-black/60">Deterministic (0–100)</div>
      </div>
    </div>
  );
}
