import { GITHUB_URL } from "../lib/links";
import { FEATURES } from "../lib/features";

export default function FeaturesGrid() {
  return (
    <div className="flex flex-col gap-5">
      <ul
        aria-label="ViCode features"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {FEATURES.map((feature) => (
          <li
            key={feature.title}
            data-feature-card
            className="flex min-w-0 flex-col gap-2 rounded-lg border border-zinc-800 bg-black p-4"
          >
            <h3 className="font-mono text-sm font-semibold text-zinc-100">
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              {feature.body}
            </p>
            <p className="mt-auto font-mono text-xs leading-relaxed text-zinc-500">
              {feature.detail}
            </p>
          </li>
        ))}
      </ul>
      <p className="font-mono text-xs text-zinc-500">
        Full details live in the{" "}
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ViCode README on GitHub"
          className="text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors hover:text-zinc-50"
        >
          README
        </a>
        .
      </p>
    </div>
  );
}
