import Link from "next/link";
import { QuestionCard } from "./shared";

export default function StrategicQuestionsSection() {
  return (
    <section className="">
      {/* <div className=""> */}

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
      {/* </div> */}
    </section>
  );
}
