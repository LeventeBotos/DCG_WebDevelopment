import Link from "next/link";
import { QuestionCard } from "./shared";

export default function StrategicQuestionsSection() {
  return (
    <section className="border-t border-dcg-lightBlue/20 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-dcg-ink md:text-3xl">
              We help leaders answer the questions that matter
            </h2>
            <p className="mt-3 max-w-xl text-sm text-dcg-slate md:text-base">
              From customer growth to AI-ready operating models, we partner with
              executives, boards and founders on the decisions that shape the
              next decade.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center rounded-full border border-dcg-lightBlue/30 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-dcg-blue shadow-sm transition hover:-translate-y-0.5 hover:border-dcg-lightBlue/60 hover:shadow-md"
          >
            View our solutions
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <QuestionCard>
            How do we reach and engage the right customers at the right moments?
          </QuestionCard>
          <QuestionCard>
            How do we convert, support and grow customers across every channel?
          </QuestionCard>
          <QuestionCard>
            How do we lay the path for an AI-first, future-built enterprise?
          </QuestionCard>
        </div>
      </div>
    </section>
  );
}
