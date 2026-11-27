import { list, p, say, steps, table, trap } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_BEHAVIORAL: PrepSection = {
  id: "sb-behavioral",
  track: "behavioral",
  title: "Behavioural: STAR stories mapped to ScotiaBond",
  blurb:
    "Recruiter screens, manager rounds and one-way videos are mostly behavioural, and reviewers say interviewers 'mostly wanted to see if you aligned with their values'. Scotiabank's culture framework, ScotiaBond, names four values (client-centric, integrity, inclusion, accountability) and four behaviours (results-driven, shaping the future, striving for better, inclusive). Prepare one true story for each, and keep every answer to about two minutes, or one in a one-way video.",
  questions: [
    {
      id: "sb-beh-star",
      question: "How should I structure a behavioural answer?",
      level: "junior",
      short:
        "Use STAR, weighted towards the A and the R. **Situation:** one or two sentences of context. **Task:** what you were responsible for. **Action:** what **you** did, in specifics: 'I', not 'we', and the technical detail that makes it real. **Result:** the outcome, with a number if you have one, and what you learned. Pick stories from internships, co-op, school projects or side projects. A small story told honestly beats an inflated one.",
      body: [
        table(
          ["ScotiaBond", "Prepare a story about", "Likely prompt"],
          ["Client-centric", "Building something around what the user actually needed", "Tell me about a time you went above and beyond for a user"],
          ["Integrity", "Raising a concern, or refusing a shortcut (security, data, quality)", "A time something didn't feel right and you spoke up"],
          ["Inclusion / Inclusive", "Working with someone very different from you, or bringing a quiet voice in", "Describe working with someone with a very different style"],
          ["Accountability", "Owning a bug, an incident or a missed commitment", "A time you made a mistake / took ownership of a problem that wasn't yours"],
          ["Results-driven", "Delivering under a deadline or with constraints", "A time you couldn't deliver on time / conflicting deadlines"],
          ["Shaping the future", "Improving a tool, a process or a build", "A time you improved developer tooling or build speed"],
          ["Striving for better", "Learning fast, or acting on feedback", "A time you had to learn something new quickly"],
        ),
        say("The same six or seven stories, retold from different angles, cover almost every behavioural question. Write them down and rehearse them out loud."),
      ],
    },
    {
      id: "sb-beh-tell-me",
      question: "Tell me about yourself.",
      level: "junior",
      short:
        "Ninety seconds, as present, past, future. **Present:** what you do now and your stack (React, TypeScript, Java or Node). **Past:** one or two experiences that prove you can ship full stack, with one concrete result. **Future:** why this role, wealth onboarding at GWE, is the logical next step. Finish with a sentence that hands the conversation back. It's a pitch, not your life story.",
      body: [
        steps(
          "'I'm a full-stack developer with [X] years across internships and projects, mostly React and TypeScript on the front end and [Spring Boot / Node] on the back end.'",
          "'At [company or project] I built [feature], which [result: users, time saved, fewer errors].' Add one more example, ideally touching APIs, cloud or testing.",
          "'I'm drawn to this role because onboarding is the first experience a wealth client has with the bank. It's full stack, regulated and event-driven, and that's the kind of engineering I want to grow in.'",
        ),
        trap("Reciting your resume chronologically from high school. Every round uses your resume anyway, so lead with what matters for this job."),
      ],
    },
    {
      id: "sb-beh-why-scotiabank",
      question: "Why Scotiabank?",
      level: "junior",
      short:
        "This is the most frequently reported question, so have a specific answer. Connect three things: **the strategy** (client primacy is the bank's stated 'North Star', and 'make it easy to do business with us' is one of its four pillars), **the technology** (Google Cloud as the enterprise platform of choice, event-driven microservices, Scotia Intelligence and AI tooling across the bank), and **you** (what you want to build and learn). Name the team, not just the brand.",
      body: [
        list(
          "**Strategy:** at the December 2023 Investor Day, CEO Scott Thomson set four pillars: grow in priority markets, earn primary client relationships, make it easy to do business with us, and win as one team.",
          "**Wealth is a growth engine:** Global Wealth Management targets more than 10% annual earnings growth, and the 2025 Annual Report's 2026 priority is to 'deliver innovative, streamlined digital client solutions and modernize our advisor tools and platforms'. That is GWE's work.",
          "**Technology:** Google Cloud became the 'enterprise cloud platform of choice' in April 2024, including a cloud client-data hub for Wealth Management. Scotia Intelligence and Scotia Navigator (April 2026) brought AI tools, including coding assistance, bank-wide.",
          "**Culture:** ScotiaBond's values, and recognition such as Best Workplaces in Canada (7th year in 2026) and Canada's Best Diversity Employers.",
        ),
        say("Onboarding is where 'make it easy to do business with us' meets client primacy. If opening an account is fast and painless, the relationship starts well. I want to build that on GWE's modern stack."),
        trap("Generic answers ('a big, stable bank', 'great reputation'), or leading with salary or job security."),
      ],
    },
    {
      id: "sb-beh-why-wealth",
      question: "Why Wealth Management, and why an onboarding team?",
      level: "junior",
      short:
        "Onboarding is where engineering, the client experience and regulation meet. Every account has to satisfy know-your-client rules, identity verification and an audit trail, and still feel simple to the client and their advisor. It is full-stack work with real domain depth: multi-step forms, APIs, events between services, security and compliance. And it is the first impression of a wealth relationship that may last decades.",
      body: [
        p("If you have financial or regulated-domain experience, say so here. If not, show curiosity: mention that the regulations shaping onboarding (CIRO's KYC and suitability rules, FINTRAC's identity verification) are things you've started reading about. The domain section of this page gives you enough to say that honestly."),
      ],
    },
    {
      id: "sb-beh-project",
      question: "Walk me through a project on your resume. (The technical deep dive.)",
      level: "intermediate",
      short:
        "This was the core of a 2025 full-stack technical round: 'a deep dive into my past projects' with two senior developers. Pick one project and know it cold: the problem, the architecture (draw it), the part **you** built, two decisions and their trade-offs, the hardest bug, how you tested and deployed it, the result, and what you would change now. Expect 'why X and not Y?' at every layer.",
      body: [
        steps(
          "**Problem and users:** one sentence each.",
          "**Architecture:** front end, API, data, hosting. Be ready to sketch it on a whiteboard or a shared screen.",
          "**Your part:** the components, endpoints or tables you personally wrote.",
          "**Decisions:** 'I chose Postgres over Mongo because…', 'I used server components for…'. Name the alternative you rejected.",
          "**Hardest problem:** symptom → how you investigated → root cause → fix → how you prevented it happening again.",
          "**Quality:** tests, CI, code review, monitoring.",
          "**Result and hindsight:** numbers if you have them, and what you'd change today.",
        ),
        trap("Listing technologies you can't defend. If it's on your resume, they will ask, and every round touches the resume."),
      ],
    },
    {
      id: "sb-beh-conflict",
      question: "Tell me about a time you had a conflict on your team and how you solved it.",
      level: "junior",
      short:
        "This was reported verbatim. Pick a disagreement about **work** (an approach, a priority, a code-review dispute), not a personality clash. Show that you listened first, looked for the goal you shared, used data or a small experiment instead of opinion, escalated respectfully if you needed to, and kept the relationship intact. End with what was decided and what you learned.",
      body: [
        list(
          "**S/T:** 'A teammate and I disagreed on whether to [cache on the client / add a new endpoint].'",
          "**A:** 'I asked them to walk me through their concern, wrote down both options with their trade-offs, and we agreed to prototype the riskier one for half a day. When it was still unclear, we took it to the tech lead with the write-up.'",
          "**R:** 'We went with [X]. It shipped on time, and I learned to bring trade-offs rather than preferences.'",
        ),
        p("This also maps to **inclusion**: did you make sure the other person's view was heard?"),
      ],
    },
    {
      id: "sb-beh-deadline",
      question: "Tell me about a time you couldn't deliver on time, or had conflicting deadlines.",
      level: "junior",
      short:
        "Show **accountability** and being **results-driven**. You saw the risk early, told people before the deadline rather than after, offered options (cut scope, a phased delivery, extra help), prioritised by impact, and delivered the most valuable part. Close with what you now do differently, such as splitting work smaller or flagging risks in stand-up.",
      body: [
        trap("Blaming others or 'unclear requirements' without saying what you did about it. Also avoid a story with no miss at all, which reads as evasive."),
      ],
    },
    {
      id: "sb-beh-stakeholder",
      question: "Tell me about a time you dealt with a difficult stakeholder, or explained something technical to a non-technical person.",
      level: "junior",
      short:
        "GWE works with business, compliance and regulatory groups, so this is likely. Show that you found out what they actually needed underneath the request. Explain in their terms, with an analogy or a quick demo instead of jargon. Make the trade-off visible ('this option ships in two weeks but needs manual review; this one takes six') and confirm the outcome in writing.",
      body: [
        say("When a compliance requirement seemed to make the form harder, I asked what risk it was mitigating. Usually there was a simpler way to meet the same control."),
      ],
    },
    {
      id: "sb-beh-learn",
      question: "Tell me about a time you had to learn something new quickly.",
      level: "junior",
      short:
        "Reported in 2026, and it maps to **striving for better**. Name the technology and the deadline. Show your method: the official docs and a tutorial, a tiny proof of concept, reading the existing code, asking a specific question of someone senior, then applying it to the real task. End with what you delivered, and what you'd teach the next person.",
      body: [
        p("For this role, a story about learning Spring Boot, Kafka, Docker or a cloud service lands especially well, because the posting expects you to grow into exactly those."),
      ],
    },
    {
      id: "sb-beh-improve",
      question: "Tell me about a time you improved developer tooling, a process or build speed.",
      level: "junior",
      short:
        "Reported in 2026, and it maps to **shaping the future**. Pick something you noticed and fixed without being asked: a slow CI step you cached, a flaky test you stabilised, a script that removed a manual deploy step, a lint rule, a component reused across screens. Quantify it (from 12 minutes to 4, three manual steps to zero), and mention how you got buy-in.",
      body: [],
    },
    {
      id: "sb-beh-ownership",
      question: "Tell me about a time you took ownership of a problem that wasn't yours, or a mistake you made.",
      level: "junior",
      short:
        "This is **accountability**. For a mistake: say plainly what you did wrong, how you found out, what you did immediately (told your lead, rolled back, fixed it), how you made sure it couldn't recur (a test, a check in the pipeline, a checklist), and what you learned. For ownership: you noticed something falling between teams and drove it to a resolution.",
      body: [
        trap("A fake mistake ('I care too much'), or a mistake with no fix. Interviewers care more about the recovery than about the error."),
      ],
    },
    {
      id: "sb-beh-integrity",
      question: "Tell me about a time something didn't feel right and you spoke up.",
      level: "junior",
      short:
        "This is **integrity**, and in a bank it often means security or client data. Good stories: you noticed personal data in logs, a missing authorisation check, a test skipped to hit a deadline, or a secret in the repository, and you raised it even though it was uncomfortable. Show how you raised it constructively, with the evidence and a proposed fix, and what changed.",
      body: [],
    },
    {
      id: "sb-beh-client",
      question: "Tell me about a time you went above and beyond for a user or client.",
      level: "junior",
      short:
        "This is **client-centric**. Show that you got closer to real users, through feedback, analytics, support tickets or watching someone use the product, and changed what you built because of it: clearer error messages, fewer steps, accessibility fixes, a bug many users hit. Quantify the effect on users if you can.",
      body: [],
    },
    {
      id: "sb-beh-inclusion",
      question: "Describe working with someone very different from you, or a time you made a teammate's voice heard.",
      level: "junior",
      short:
        "This is **inclusion**. A teammate from another discipline, culture, time zone or experience level, or a quiet person in meetings. Show that you adapted how you communicated (written summaries, async updates, asking directly for their view), and that the result was better because of the different perspective.",
      body: [],
    },
    {
      id: "sb-beh-feedback",
      question: "Tell me about critical feedback you received.",
      level: "junior",
      short:
        "This is **striving for better**, and it matters doubly because the posting says you'll 'take direction from senior engineers'. Pick real feedback, perhaps from a code review or a lead. Show that you listened without getting defensive, asked a follow-up question to understand it, changed your behaviour, and can point to evidence that you changed.",
      body: [],
    },
    {
      id: "sb-beh-five-years",
      question: "Where do you see yourself in five years?",
      level: "junior",
      short:
        "Reported for developer roles. Show ambition that fits the job: becoming a strong full-stack engineer who owns features end to end, deepening your skills in distributed systems and cloud, mentoring newer developers, perhaps moving towards a senior or tech-lead path, all within the bank. Keep it believable and connected to this team.",
      body: [
        trap("'Doing your job' or 'running my own startup'. Both signal a poor fit."),
      ],
    },
    {
      id: "sb-beh-one-way",
      question: "How do I handle a one-way (pre-recorded) video interview?",
      level: "junior",
      short:
        "Candidates report about 30 seconds to prepare and about 1 minute to answer, for roughly 3–5 behavioural or situational questions, with a hard cut-off. Rehearse to a timer, using STAR compressed to about 15 seconds each for Situation and Task, 30 for Action and 15 for Result. Look at the camera, with good light and a quiet room. Practise with your phone recording first, because one candidate called the cut-off 'very stressful'.",
      body: [
        list(
          "Have bullet notes for your six stories nearby (not a script). Thirty seconds is just enough to pick a story.",
          "If you get re-records, use one on the first question to settle in.",
          "Campus and co-op postings also ask for a Plum profile, about 25 minutes of puzzles, personality and scenarios. Answer consistently and honestly; it isn't graded by speed.",
        ),
      ],
    },
  ],
};
