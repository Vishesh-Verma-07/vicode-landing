/**
 * FAQ facts trace to the ViCode README Requirements and
 * Known limitations sections — no invented claims.
 */
export const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question: "Why does the cost display show $0.00?",
    answer:
      "Cost display only covers eight hardcoded models. Any other model — including the default — shows $0.00 even though tokens are still counted correctly.",
  },
  {
    question: "Why is the Context row missing?",
    answer:
      "The Context row needs a warm model cache: it appears once the active model's context length is known from ~/.vicode/models-cache.json. Open /model once to populate it; until then budgeting falls back to a 200k window.",
  },
  {
    question: "How do I delete old sessions?",
    answer:
      "Sessions cannot be deleted from the UI. /session lists and switches; prune old <project>/.vicode/sessions/*.json files manually.",
  },
  {
    question: "Does ViCode work in Windows cmd?",
    answer:
      "ViCode shells out to bash -c, so it needs a bash binary on PATH. On Windows that means Git Bash or WSL — on stock cmd or PowerShell, bash calls fail until you install one.",
  },
];
