"use client";

/**
 * One topic's free-play entry, including mockup 1l's exhausted state — every
 * question in the topic answered at least once, with the option to reset the
 * "seen" list or move to the weakest topic instead.
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { QuestionSubject } from "@/data/types";
import { useProgress } from "@/components/progress-provider";
import { CoverageRing, MasteryBar } from "@/components/meters";
import { rowsForSubject, subjectMeta, SUBJECTS } from "@/lib/question-index";
import { subjectProgress } from "@/lib/drill";
import { weakSubjects } from "@/lib/progress";
import { INDEX_BY_ID } from "@/lib/question-index";
import { stagger, staggerChild } from "@/lib/motion";

const subjectOf = (id: string) => INDEX_BY_ID.get(id)?.subject;

export function SubjectView({ subject }: { subject: QuestionSubject }) {
  const router = useRouter();
  const { progress, resetSubject } = useProgress();
  const meta = subjectMeta(subject);
  const rows = rowsForSubject(subject);

  const [coverage] = subjectProgress(
    progress.seenQuestionIds,
    progress.correctQuestionIds,
    [{ subject, total: rows.length }],
  );

  // A topic with no questions can be reached by URL; say so plainly.
  if (rows.length === 0) {
    return (
      <Shell>
        <h1 className="text-parchment m-0 mb-2.5 text-xl font-semibold">
          No questions in {meta?.title ?? subject} yet.
        </h1>
        <p className="text-stone mb-6 text-[14px]/[1.65]">
          This topic is defined in the taxonomy but the bank has nothing for it.
        </p>
        <Link
          href="/topics"
          className="bg-flame text-ink inline-block rounded-lg px-[22px] py-[13px] text-[14px] font-semibold"
        >
          Back to topics
        </Link>
      </Shell>
    );
  }

  const weakest = weakSubjects(progress, subjectOf).find((s) => s !== subject);
  const weakestMeta = weakest ? subjectMeta(weakest) : undefined;
  const fallback = weakestMeta ?? SUBJECTS.find((s) => s.subject !== subject);

  if (coverage.exhausted) {
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="border-line-3 text-clay mx-auto mb-5 grid size-[46px] place-items-center rounded-full border font-mono text-xl">
            ✓
          </div>
          <h1 className="text-parchment m-0 mb-2.5 text-xl font-semibold text-balance">
            You&apos;ve cleared every {meta?.title ?? subject} question.
          </h1>
          <p className="text-stone mx-auto mb-6 max-w-[36ch] text-[14px]/[1.65] text-pretty">
            All {rows.length} answered at least once. Reset the &ldquo;seen&rdquo; list to cycle
            them again, or move to your weakest topic.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {fallback ? (
              <Link
                href={`/topics/${fallback.subject}`}
                className="bg-flame text-ink rounded-lg px-[22px] py-[13px] text-[14px] font-semibold"
              >
                Drill {fallback.title} instead
              </Link>
            ) : null}
            <button
              type="button"
              onClick={() => {
                resetSubject(rows.map((r) => r.id));
                toast.success(`${meta?.title ?? subject} reset — all ${rows.length} are new again.`);
              }}
              className="border-line-3 text-bone hover:border-line-2 rounded-lg border px-[18px] py-[13px] text-[13.5px] font-medium transition-colors"
            >
              Reset {meta?.title ?? subject}
            </button>
          </div>
        </motion.div>
      </Shell>
    );
  }

  return (
    <Shell>
      <motion.div variants={stagger(0.06)} initial="hidden" animate="show">
        <motion.div variants={staggerChild} className="mb-5 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-parchment m-0 mb-1.5 text-2xl font-semibold tracking-[-0.02em]">
              {meta?.title ?? subject}
            </h1>
            <p className="text-stone m-0 max-w-[52ch] text-[14px]/[1.65] text-pretty">
              {meta?.description}
            </p>
          </div>
          <CoverageRing
            percent={(coverage.seen / rows.length) * 100}
            size={52}
            stroke={5}
            className="shrink-0"
          />
        </motion.div>

        <motion.div variants={staggerChild} className="mb-6">
          <MasteryBar
            label={`${coverage.seen} of ${rows.length} seen`}
            percent={coverage.seen > 0 ? coverage.mastery : 0}
            detail={coverage.seen > 0 ? `${coverage.mastery}% correct` : "not started"}
          />
        </motion.div>

        <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-3.5">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/drill?mode=free&subject=${subject}`)}
            className="bg-flame text-ink rounded-lg px-7 py-[15px] text-[15px] font-semibold"
          >
            Start free play →
          </motion.button>
          <span className="text-slate text-[12.5px]">
            {rows.length - coverage.seen} unseen · doesn&apos;t affect your streak
          </span>
        </motion.div>
      </motion.div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[620px] px-6 py-8 sm:py-14">
      <Link
        href="/topics"
        className="text-ash hover:text-bone mb-8 inline-flex items-center gap-2 text-[13px] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Topics
      </Link>
      {children}
    </div>
  );
}
