import Link from "next/link";
import { StatCard } from "./shared";

export default function AIAtWorkSection() {
  return (
    <section>
      <div className="grid gap-6 md:grid-cols-4">
        <StatCard
          label="Regular AI users"
          value="72%"
          note="but adoption on the frontline is much lower"
        />
        <StatCard
          label="Satisfied with AI training"
          value="36%"
          note="highlighting a large enablement gap"
        />
        <StatCard
          label="Fear job loss from AI"
          value="41%"
          note="showing why responsible AI and upskilling matter"
        />
        <StatCard
          label="AI agents in workflows"
          value="13%"
          note="most companies still treat AI as isolated tools"
        />
      </div>
    </section>
  );
}
