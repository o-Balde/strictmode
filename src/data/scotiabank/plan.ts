import type { Checklist } from "../codesignal";
import type { AskThem, PlanDay, TalkingPoint } from "./types";

export const WHY_SCOTIABANK: TalkingPoint[] = [
  {
    title: "A strategy with the client at the centre",
    text: "At the December 2023 Investor Day, CEO Scott Thomson set four pillars: grow and scale in priority markets, earn primary client relationships, **make it easy to do business with us**, and win as one team. The 2025 Annual Report calls client primacy the bank's 'North Star'. Onboarding is the first moment of every primary relationship.",
    confidence: "official",
    sources: ["investor-day-strategy", "ar-2025"],
  },
  {
    title: "Wealth is a growth engine, and this team's work is the stated priority",
    text: "Global Wealth Management targets more than 10% annual earnings growth and 25% more clients with a financial plan. It earned $488M in Q1 2026, up 18%. The 2026 priority reads like the GWE posting: 'deliver innovative, streamlined digital client solutions and modernize our advisor tools and platforms to deliver a leading end-to-end client experience'.",
    confidence: "official",
    sources: ["investor-day-gwm", "ar-2025", "q1-2026"],
  },
  {
    title: "A cloud-first, event-driven modernisation",
    text: "Google Cloud became the bank's 'enterprise cloud platform of choice' in April 2024, with a cloud client-data hub for Wealth Management. That fits the posting's Cloud Run, Pub/Sub and Kafka. It is a chance to build modern systems inside a regulated business.",
    confidence: "official",
    sources: ["google-cloud-2024", "posting-278593"],
  },
  {
    title: "AI in everyday engineering",
    text: "Scotia Intelligence and Scotia Navigator (April 2026) brought AI tools bank-wide, including coding assistance for technology teams. About 70% of Scotia Wealth Management staff use AI daily. Mention it as something you'd use responsibly around client data.",
    confidence: "official",
    sources: ["scotia-intelligence", "wealthprofessional-ai"],
  },
  {
    title: "A culture framework that names what it rewards",
    text: "ScotiaBond's values (client-centric, integrity, inclusion, accountability) and behaviours (results-driven, shaping the future, striving for better, inclusive) are written into goals and year-end rewards. Pick the one that matches how you like to work and give an example.",
    confidence: "official",
    sources: ["code-of-conduct", "ar-2024"],
  },
  {
    title: "Recognition as an employer",
    text: "Best Workplaces in Canada for a seventh year running, and one of Canada's Best Diversity Employers, both in 2026. Use these lightly, as support, never as the main reason.",
    confidence: "official",
    sources: ["awards"],
  },
  {
    title: "New wealth offerings mean new onboarding flows",
    text: "Scotia Global Intelligence for ultra-high-net-worth clients (October 2026), built with Addepar and Marsh, and Signature Banking in Canada (2025) all need clients and accounts opened smoothly. That makes a good bridge into a question about the team's roadmap.",
    confidence: "reported",
    sources: ["global-intelligence", "ar-2025"],
  },
];

export const ASK_THEM: AskThem[] = [
  {
    question: "Which onboarding journeys is the team focused on right now (ScotiaMcLeod, private investment counsel, private banking), and how much of onboarding is still advisor-assisted or paper-based?",
    why: "It shows you know Scotia Wealth Management is several businesses, and the answer tells you what you'd actually build.",
  },
  {
    question: "How do requirements from compliance and regulatory groups, such as KYC, suitability or audit trails, reach the backlog? Do engineers talk to those partners directly?",
    why: "The posting names regulatory and compliance groups. This shows you take them seriously and want to understand the 'why'.",
  },
  {
    question: "Where do GWE's services run today, Cloud Run, App Service or on premises, and what's the target state?",
    why: "The posting lists both clouds. The answer reveals the modernisation stage and where the learning curve is.",
  },
  {
    question: "How do onboarding events flow to downstream systems? Is it Kafka, Pub/Sub, or both?",
    why: "It connects to the event-streaming 'asset' and to the wealth data hub on Google Cloud.",
  },
  {
    question: "What does success look like for onboarding: time to open, drop-off per step, NPS, advisor time saved?",
    why: "A client-centric, results-driven question. Commercial banking cut onboarding from about 30 days to about 10; ask what wealth's equivalent goal is.",
  },
  {
    question: "What do the first 90 days look like for a new developer? How do senior engineers mentor: pairing, code review, on-call shadowing?",
    why: "The role says 'under guidance from senior engineers'. This shows you want to ramp up deliberately.",
  },
  {
    question: "How is the team using Scotia Navigator's coding assistance, and what guardrails apply around client data?",
    why: "It's current (April 2026), it's technical, and it signals judgement about AI and privacy.",
  },
  {
    question: "What's the in-office rhythm for this team, and how are collaboration days used?",
    why: "A practical question about the four-day policy, asked without sounding like a complaint.",
  },
  {
    question: "What do the people who do best on this team have in common?",
    why: "Scotiabank's own interview tips suggest asking about culture and team dynamics. The answer tells you what to emphasise in follow-ups.",
  },
];

export const PLAN: PlanDay[] = [
  {
    day: "Day 1",
    title: "Decode the role and write your stories",
    tasks: [
      "Read 'The role, decoded' and 'The interview loop'. Note which `core` lines you're weakest on.",
      "Write seven STAR stories, one per ScotiaBond value and behaviour, as bullet points.",
      "Write and time your 90-second 'tell me about yourself' and your 'why Scotiabank'.",
    ],
    sections: ["sb-behavioral"],
  },
  {
    day: "Day 2",
    title: "JavaScript, TypeScript and React",
    tasks: [
      "Answer every question in the JavaScript and React sections out loud before opening it.",
      "From a blank file: the fetch-and-render table, the class counter, and the todo app, 20 minutes each.",
    ],
    sections: ["sb-javascript", "sb-react", "sb-builds"],
  },
  {
    day: "Day 3",
    title: "Next.js, Node and REST",
    tasks: [
      "Build the Node GET/POST API from memory, with validation and status codes.",
      "Explain Server vs Client Components, idempotency keys and the main status codes without notes.",
    ],
    sections: ["sb-nextjs", "sb-node", "sb-rest"],
  },
  {
    day: "Day 4",
    title: "Java and Spring Boot",
    tasks: [
      "Write the `Account` class hierarchy, `equals`/`hashCode`, a `groupingBy` stream and `BigDecimal` division by hand.",
      "Sketch a controller → service → repository flow with validation and a `@RestControllerAdvice`.",
    ],
    sections: ["sb-java", "sb-spring"],
  },
  {
    day: "Day 5",
    title: "Codility under the clock",
    tasks: [
      "Do two timed sets: three problems in 90 minutes, in one language, with no hints.",
      "Redo every problem in the coding section you couldn't solve in 20 minutes. Say the complexity out loud each time.",
    ],
    sections: ["sb-coding"],
  },
  {
    day: "Day 6",
    title: "Data, events and design",
    tasks: [
      "Write the SQL queries from memory: the anti-join, HAVING, second highest, top per group, running balance.",
      "Explain partitions, consumer groups and at-least-once delivery. Sketch the onboarding flow and the transfer API.",
    ],
    sections: ["sb-sql", "sb-mongo", "sb-microservices", "sb-events", "sb-design"],
  },
  {
    day: "Day 7",
    title: "Cloud, DevOps, security and the domain",
    tasks: [
      "Cloud Run vs Cloud Functions, Key Vault with managed identity, a pipeline from commit to production.",
      "Encoding vs encryption vs hashing, OAuth2 with PKCE, JWT validation. Read the wealth-onboarding domain notes twice.",
    ],
    sections: ["sb-cloud", "sb-devops", "sb-security", "sb-testing", "sb-agile", "domain"],
  },
  {
    day: "Day before",
    title: "Rehearse, don't cram",
    tasks: [
      "Rehearse your project deep dive out loud, drawing the architecture, and answer three 'why X and not Y?' questions about it.",
      "Use 'Draw a question' for a 20-minute mock round across tracks. Pick three questions to ask them.",
      "Re-read the reported questions. Sleep.",
    ],
    sections: ["sb-behavioral"],
  },
];

export const CHECKLISTS: Checklist[] = [
  {
    id: "sb-checklist-builds",
    title: "Built from a blank file",
    items: [
      "React table from an API with loading, error and empty states",
      "Counter as a class component and as a function component",
      "Todo app: add, toggle, delete, remaining count",
      "Node/Express GET + POST with validation and 201/400/404",
      "Spring controller binding query params to a record",
      "Number of Islands, merge intervals and two sum, each in under 20 minutes",
      "Second-highest and top-per-group SQL",
    ],
  },
  {
    id: "sb-checklist-stories",
    title: "STAR stories rehearsed out loud",
    items: [
      "Client-centric: built around what users needed",
      "Integrity: spoke up or refused a shortcut",
      "Inclusion: worked across differences",
      "Accountability: owned a mistake or a problem",
      "Results-driven: delivered under a deadline",
      "Shaping the future: improved a tool or process",
      "Striving for better: learned fast or acted on feedback",
    ],
  },
  {
    id: "sb-checklist-day-of",
    title: "On the day",
    items: [
      "Teams, camera and microphone tested; quiet room, good light",
      "Resume open, and you know every line of it",
      "Editor ready, with no autocomplete you'd lack in Codility",
      "Your 90-second pitch and 'why Scotiabank' said out loud once",
      "Three questions for them written down",
      "Water, a notepad, a pen for sketching architecture",
      "A thank-you note drafted to send afterwards",
    ],
  },
];
