import { computeAtsScoreV1 } from "@/lib/atsScore";
import type { ResumeData } from "@/lib/resumeTypes";

export function AtsScoreCard({ data }: { data: ResumeData }) {
  const result = computeAtsScoreV1(data);

  const improvements: string[] = [];
  if (data.projects.length < 2) improvements.push("Add at least 2 projects.");
  if (!result.breakdown.numbers) improvements.push("Add measurable impact (numbers) in bullets.");
  const summaryWords = data.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords > 0 && summaryWords < 40) improvements.push("Expand your summary to 40+ words.");
  const skillsCount =
    (data.skills.technical?.length ?? 0) +
    (data.skills.soft?.length ?? 0) +
    (data.skills.tools?.length ?? 0);
  if (skillsCount < 8) improvements.push("Add more skills (target 8+).");
  if (data.experience.length < 1) improvements.push("Add experience (internship, freelancing, or project work).");
  const top3Improvements = improvements.slice(0, 3);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-sm font-semibold tracking-tight">ATS Readiness Score</div>
          <div className="mt-1 text-xs text-black/60">Deterministic v1 (0–100)</div>
        </div>
        <div className="text-2xl font-semibold tabular-nums">{result.score}</div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-black/10">
          <div
            className="h-2 rounded-full bg-black"
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>

      {result.suggestions.length > 0 ? (
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Suggestions
          </div>
          <div className="mt-2 space-y-2">
            {result.suggestions.map((s) => (
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

      {top3Improvements.length > 0 ? (
        <div className="mt-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Top 3 Improvements
          </div>
          <div className="mt-2 space-y-2">
            {top3Improvements.map((s) => (
              <div
                key={s}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm text-black/80"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
