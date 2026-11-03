import { n, rank, type Counters } from "./aggregate";
import { delta, fmtPct, type Metrics } from "./metrics";
import { pageLabel, vitalBucket, VITALS, type VitalName } from "./vocab";

export type Insight = { tone: "good" | "warn" | "info"; text: string };

const pctText = (d: number) => `${d >= 0 ? "up" : "down"} ${Math.abs(Math.round(d * 100))}%`;

/** Plain-language highlights derived from the numbers. Rule-based, deterministic and cheap. */
export function buildInsights(cur: Metrics, prev: Metrics, c: Counters): Insight[] {
  const out: Insight[] = [];

  if (cur.visitors === 0) return [{ tone: "info", text: "No visitor data has been recorded for this period yet." }];

  const dv = delta(cur.visitors, prev.visitors);
  if (dv !== null && Math.abs(dv) >= 0.1 && prev.visitors >= 10) {
    out.push({ tone: dv > 0 ? "good" : "warn", text: `Unique visitors are ${pctText(dv)} compared with the previous period (${prev.visitors} → ${cur.visitors}).` });
  }

  const da = delta(cur.applySuccess, prev.applySuccess);
  if (cur.applySuccess > 0 && da !== null && da !== 0) {
    out.push({ tone: da > 0 ? "good" : "info", text: `${cur.applySuccess} application${cur.applySuccess === 1 ? "" : "s"} submitted, ${pctText(da)} vs the previous period.` });
  }

  // Careers funnel leak
  if (cur.applyOpens >= 5) {
    const startRate = cur.applyStarts / cur.applyOpens;
    const finishRate = cur.applyStarts > 0 ? cur.applySuccess / cur.applyStarts : 0;
    if (cur.applyStarts >= 5 && finishRate < 0.5) {
      out.push({ tone: "warn", text: `Only ${fmtPct(finishRate, 0)} of people who start the application form finish it. Consider shortening the form.` });
    } else if (startRate < 0.4) {
      out.push({ tone: "info", text: `${fmtPct(1 - startRate, 0)} of people who open the apply form never start filling it in.` });
    }
  }

  // Best channel
  const channels = rank(c, "uvrefcat_", { exclude: ["direct"] });
  if (channels[0]) out.push({ tone: "info", text: `Most visitors arrive from ${channels[0].key} (${channels[0].value}).` });
  const ai = n(c, "uvrefcat_ai");
  if (ai > 0) out.push({ tone: "good", text: `${ai} visitor${ai === 1 ? "" : "s"} arrived from AI assistants (ChatGPT, Perplexity, Claude and similar).` });

  // Content: high traffic, low engagement
  const pages = rank(c, "pv_", { exclude: ["other"] });
  for (const p of pages.slice(0, 5)) {
    const seconds = n(c, `tp_${p.key}_s`);
    const samples = n(c, `tp_${p.key}_n`);
    if (p.value >= 20 && samples >= 10 && seconds / samples < 8) {
      out.push({ tone: "warn", text: `${pageLabel(p.key)} gets ${p.value} views but people stay only ${Math.round(seconds / samples)}s on average.` });
      break;
    }
  }

  // Performance
  for (const name of Object.keys(VITALS) as VitalName[]) {
    const samples = n(c, `vit_${name}_n`);
    if (samples < 10) continue;
    const avg = n(c, `vit_${name}_sum`) / samples;
    if (vitalBucket(name, avg) === "poor") {
      out.push({ tone: "warn", text: `${VITALS[name].label} averages ${Math.round(avg)}${name === "cls" ? "/1000" : "ms"}, which Google rates as poor.` });
    }
  }
  if (cur.jsErrors > 0) out.push({ tone: "warn", text: `${cur.jsErrors} JavaScript error${cur.jsErrors === 1 ? "" : "s"} were recorded. See the Performance tab.` });
  if (cur.notFound >= 3) out.push({ tone: "warn", text: `${cur.notFound} visitors hit a 404 page.` });

  if (cur.bounceRate > 0.8 && cur.visitors >= 20) {
    out.push({ tone: "warn", text: `${fmtPct(cur.bounceRate, 0)} of visitors view only one page.` });
  }
  return out.slice(0, 8);
}
