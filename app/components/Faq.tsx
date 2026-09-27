import { FAQ_ITEMS } from "../lib/faq";

export default function Faq() {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.question}
          className="group min-w-0 rounded-lg border border-zinc-800 bg-black p-4"
        >
          <summary className="cursor-pointer font-mono text-sm text-zinc-100 transition-colors hover:text-white">
            {item.question}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
