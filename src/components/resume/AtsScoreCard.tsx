import { computeAtsScoreV1 } from "@/lib/atsScore";
import type { ResumeData } from "@/lib/resumeTypes";

export function AtsScoreCard({ data }: { data: ResumeData }) {
  const result = computeAtsScoreV1(data);
  const topSuggestions = result.suggestions.slice(0, 3);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-tight">ATS Readiness Score</div>
          <div className="mt-1 text-xs text-black/60">Deterministic (0–100)</div>
        </div>
        <div className="text-2xl font-semibold tabular-nums">{result.score}</div>
      </div>

      <div className="mt-2 text-sm text-black/70">
        {result.band.label}
      </div>

      {topSuggestions.length > 0 ? (
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Suggestions
          </div>
          <div className="mt-2 space-y-2">
            {topSuggestions.map((s) => (
              <div
                key={s}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 text-sm text-black/70">Strong baseline. Keep refining wording and impact.</div>
      )}
    </div>
  );
}
