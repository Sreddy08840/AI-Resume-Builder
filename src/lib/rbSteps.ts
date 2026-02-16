export type RbStep = {
  index: number;
  slug: string;
  title: string;
};

export const RB_STEPS: RbStep[] = [
  { index: 1, slug: "01-problem", title: "Problem" },
  { index: 2, slug: "02-market", title: "Market" },
  { index: 3, slug: "03-architecture", title: "Architecture" },
  { index: 4, slug: "04-hld", title: "HLD" },
  { index: 5, slug: "05-lld", title: "LLD" },
  { index: 6, slug: "06-build", title: "Build" },
  { index: 7, slug: "07-test", title: "Test" },
  { index: 8, slug: "08-ship", title: "Ship" },
];

export function rbStepFromSlug(slug: string) {
  return RB_STEPS.find((s) => s.slug === slug) ?? null;
}
