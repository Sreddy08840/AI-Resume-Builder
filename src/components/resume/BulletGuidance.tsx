import { bulletHasNumber, bulletStartsWithActionVerb, extractBullets } from "@/lib/bulletGuidance";

export function BulletGuidance({ text }: { text: string }) {
  const bullets = extractBullets(text);

  if (bullets.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      {bullets.map((b, idx) => {
        const needsVerb = !bulletStartsWithActionVerb(b);
        const needsNum = !bulletHasNumber(b);

        if (!needsVerb && !needsNum) return null;

        return (
          <div key={idx} className="rounded-xl border border-black/10 bg-white px-3 py-2">
            <div className="text-xs font-semibold text-black/60">Bullet {idx + 1}</div>
            <div className="mt-1 text-xs text-black/80">{b}</div>
            <div className="mt-2 space-y-1">
              {needsVerb ? (
                <div className="text-xs text-black/60">Start with a strong action verb.</div>
              ) : null}
              {needsNum ? (
                <div className="text-xs text-black/60">Add measurable impact (numbers).</div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
