import { list, p, table } from "../interview-prep/blocks";
import type { Fact } from "../codesignal";
import type { InterviewStage, ReportedQuestion, Requirement } from "./types";

/** The posting, line by line: how deep to prepare each part, and where on this page. */
export const REQUIREMENTS: Requirement[] = [
  {
    text: "Front-End: React.js, Next.js, JavaScript (ES6+), TypeScript",
    weight: "core",
    probe: "Hooks and effects, controlled forms, Context vs Redux, `let`/`var`/`const`, SSR vs CSR, plus a live React build (a table from an API, a counter, a todo app).",
    sections: ["sb-javascript", "sb-react", "sb-nextjs", "sb-builds"],
  },
  {
    text: "Back-End: Node.js",
    weight: "core",
    probe: "A REST API in Express with GET and POST, the event loop, middleware, a Node BFF in front of microservices.",
    sections: ["sb-node", "sb-builds"],
  },
  {
    text: "Back-End: Java (Java 8+), Spring Boot basics",
    weight: "core",
    probe: "The four pillars of OOP, collections and `equals`/`hashCode`, streams, `BigDecimal`, a controller → service → repository flow, `@Transactional`.",
    sections: ["sb-java", "sb-spring"],
  },
  {
    text: "Microservices & REST APIs: service-oriented architecture",
    weight: "core",
    probe: "Methods and status codes, idempotency for double submits, sync vs async, the BFF and gateway, sagas and the outbox.",
    sections: ["sb-rest", "sb-microservices", "sb-design"],
  },
  {
    text: "Databases: SQL (PostgreSQL, Azure SQL), basic NoSQL (MongoDB)",
    weight: "core",
    probe: "One easy SQL question in the assessment: joins, GROUP BY/HAVING, second highest. Then indexes, transactions and locking, and when to use Mongo.",
    sections: ["sb-sql", "sb-mongo"],
  },
  {
    text: "Security: SSL/TLS, OAuth2, JWT; security-first development",
    weight: "core",
    probe: "Encoding vs encryption vs hashing (reported in 2026), the TLS handshake, Authorization Code + PKCE, validating a JWT, the OWASP basics.",
    sections: ["sb-security"],
  },
  {
    text: "Strong problem-solving skills",
    weight: "core",
    probe: "A Codility test: three problems, easy to medium, every test case must pass. Explaining while you code in the live round.",
    sections: ["sb-coding"],
  },
  {
    text: "Troubleshoot development and production issues with guidance",
    weight: "familiar",
    probe: "'Walk me through debugging a production issue', with logs, traces and correlation ids, and a rollback before a fix.",
    sections: ["sb-agile", "sb-microservices"],
  },
  {
    text: "DevOps & CI/CD: Git, Jenkins, GitHub Actions; support CI/CD and automated testing",
    weight: "familiar",
    probe: "Pipeline stages from commit to production, building once and promoting, merge vs rebase, the testing pyramid.",
    sections: ["sb-devops", "sb-testing"],
  },
  {
    text: "Google Cloud: Cloud Run, Cloud Functions basics",
    weight: "familiar",
    probe: "Which one to use when, stateless containers on `$PORT`, Pub/Sub triggers, service accounts and Secret Manager.",
    sections: ["sb-cloud"],
  },
  {
    text: "Microsoft Azure: App Services, Key Vault basics",
    weight: "familiar",
    probe: "Deployment slots, managed identity, Key Vault references, what to do when a secret leaks.",
    sections: ["sb-cloud"],
  },
  {
    text: "Agile methodologies and SDLC; code reviews and coding standards",
    weight: "familiar",
    probe: "Scrum ceremonies, the Definition of Done, what you look for in a review, how a bank's SDLC adds controls.",
    sections: ["sb-agile"],
  },
  {
    text: "Work in cross-functional teams and take direction from senior engineers",
    weight: "familiar",
    probe: "Behavioural: conflict, feedback, difficult stakeholders, learning fast. Values alignment (ScotiaBond).",
    sections: ["sb-behavioral"],
  },
  {
    text: "Event Streaming: Kafka or Google Pub/Sub (asset)",
    weight: "asset",
    probe: "Topics, partitions and keys, consumer groups, at-least-once delivery and idempotent consumers, dead-letter topics.",
    sections: ["sb-events"],
  },
  {
    text: "Containerization: Docker, Kubernetes (asset)",
    weight: "asset",
    probe: "Image vs container, a multi-stage Dockerfile, pods, services and probes.",
    sections: ["sb-devops"],
  },
  {
    text: "Understanding of financial services domain (asset)",
    weight: "asset",
    probe: "Money as integers or `BigDecimal`, KYC and identity verification, audit trails, an account-opening flow.",
    sections: ["domain", "sb-design"],
  },
];

export const STAGES: InterviewStage[] = [
  {
    id: "stage-screening",
    name: "Screening tools (campus and early-talent postings)",
    length: "Plum about 25 min · video 3–5 questions",
    format: "Online, on your own",
    expect: [
      "A **Plum** profile: grid puzzles, personality statements and workplace scenarios. You upload a screenshot instead of a resume.",
      "A **one-way video**: about 30 seconds to prepare and about 1 minute to answer, with a hard cut-off.",
      "Experienced-hire postings such as Req 278593 may skip both. Do them properly if the application asks.",
    ],
    prepare: [
      "Rehearse six STAR stories to a 60-second timer, out loud, on camera.",
      "Answer the personality section consistently. It isn't timed.",
    ],
    confidence: "reported",
    sources: ["globalnews-plum", "candidatefalcon-plum", "gd-intern"],
  },
  {
    id: "stage-recruiter",
    name: "Recruiter screen",
    length: "20–30 min",
    format: "Recruiter, phone or Teams",
    expect: [
      "Your background, why Scotiabank, why this team, what you're looking for.",
      "Practicalities: start date, salary expectations, the in-office expectation (4 days a week where space allows).",
    ],
    prepare: [
      "A 90-second 'tell me about yourself' and a specific 'why Scotiabank'.",
      "A salary range grounded in the data on this page, and your questions about the process.",
    ],
    confidence: "official",
    sources: ["blog-digital-banking", "how-to-apply", "gd-sd"],
  },
  {
    id: "stage-codility",
    name: "Online coding assessment (Codility)",
    length: "60–90 min",
    format: "Codility, any language; some reports mention camera and screen proctoring",
    expect: [
      "Three problems, usually LeetCode easy to medium. Every hidden test must pass, including performance.",
      "Sometimes practical React tasks instead: render a table from an endpoint, a counter as a class component.",
      "Sometimes one easy SQL question.",
    ],
    prepare: [
      "Do two timed sets of three problems in your strongest language (TypeScript or Java).",
      "Drill the patterns in the coding section, and test edge cases before submitting.",
    ],
    confidence: "reported",
    sources: ["gd-intern", "gd-codility-react", "gd-fsd", "gd-swe", "interviewquery"],
  },
  {
    id: "stage-technical",
    name: "Technical interview with senior developers",
    length: "45–60 min",
    format: "1–2 senior developers on Teams; sometimes in person with a whiteboard",
    expect: [
      "A **deep dive into your past projects** and 'theoretical' questions: React, JavaScript, Java OOP, REST, SQL, security.",
      "Sometimes live or pair coding (a LeetCode-style problem, a small React or Node build) while explaining your reasoning.",
      "The bank's own blog mentions scenario questions and a virtual whiteboard session.",
    ],
    prepare: [
      "One project you can explain at every layer, with its trade-offs.",
      "The question bank below, answered out loud. The live builds from a blank file.",
    ],
    confidence: "reported",
    sources: ["gd-fsd", "gd-swe", "gd-sd", "gd-digital-factory", "blog-digital-banking"],
  },
  {
    id: "stage-manager",
    name: "Hiring-manager round",
    length: "30–45 min",
    format: "Hiring manager, sometimes with HR or a second manager",
    expect: [
      "Behavioural and situational questions in STAR form, and alignment with the bank's values.",
      "How you'd fit the team, how you take direction, your questions for them.",
    ],
    prepare: [
      "Stories mapped to ScotiaBond's values and behaviours.",
      "Three or four sharp questions about GWE's onboarding modernisation.",
    ],
    confidence: "reported",
    sources: ["gd-fsd", "internia-2026", "gd-java-coop", "blog-digital-banking"],
  },
  {
    id: "stage-offer",
    name: "Offer and pre-employment checks",
    length: "1–3 weeks",
    format: "Recruiter",
    expect: ["Background and criminal checks, references and education verification, then onboarding."],
    prepare: ["Have references ready and tell them to expect a call."],
    confidence: "official",
    sources: ["how-to-apply"],
  },
];

export const PROCESS: Fact[] = [
  {
    title: "Codility is the reported platform, not HackerRank",
    body: [
      p("Every assessment report that names a platform names Codility. That applies to interns, software developers, full-stack and senior developers: three problems, 60 to 90 minutes, any language, all test cases must pass. RBC is the bank that uses HackerRank, and CodeSignal appears in some RBC Capital Markets reports, not Scotiabank's."),
      list(
        "Practise in an editor without autocomplete, and run your own edge cases. Codility's hidden tests include large inputs.",
        "Reported difficulty varies, from 1 medium + 2 easy to 3 medium. Prepare for medium.",
      ),
    ],
    confidence: "reported",
    sources: ["gd-intern", "gd-fsd", "gd-swe", "gd-senior-sd", "gd-codility-react"],
  },
  {
    title: "The resume is examined in every round",
    body: [
      p("Several candidates gave the same advice: know every line of your resume, because every round touches it. The closest match to this role, a Toronto full-stack candidate in March 2025, found the technical round 'more of a theoretical discussion and a deep dive into my past projects' than coding."),
    ],
    confidence: "reported",
    sources: ["gd-fsd", "gd-sd", "gd-senior-sd"],
  },
  {
    title: "Difficulty, timeline and volume",
    body: [
      table(
        ["Measure", "Value"],
        ["Glassdoor difficulty, Software Developer", "2.7 / 5 (easy to medium)"],
        ["Positive experience", "About 59%"],
        ["Average time to hire", "About 16–22 days; individual reports range from 2 to 6 weeks"],
        ["Most common stages", "Group panel, phone screen, skills test"],
      ),
    ],
    confidence: "reported",
    sources: ["gd-sd"],
  },
  {
    title: "'Entry level' still means internship experience",
    body: [
      p("The posting asks for 2–4 years of full-stack experience, 'internship and/or professional'. Count co-op terms and internships explicitly on your resume, and in your first answer. The work is 'under guidance from senior engineers', so curiosity and coachability count for as much as depth."),
    ],
    confidence: "official",
    sources: ["posting-278593"],
  },
  {
    title: "Work arrangement and pay",
    body: [
      list(
        "Head-office teams have been in the office **four or more days a week** since September 2025 where space allows. Teams short of space started at three. One copy of this posting labels it on-site. Ask the recruiter what applies to GWE.",
        "Levels.fyi puts median total compensation for the lowest software-engineer level in the GTA at about CA$87.7K, and Glassdoor's Toronto Software Developer average is about CA$89.5K across all seniorities. Both are small or mixed samples. A realistic entry-level base is in the high CA$70Ks to around CA$90K, plus a bonus.",
        "Ontario's pay-transparency rules (in force January 2026) require public postings from larger employers to state a pay range. Check the posting first.",
      ),
    ],
    confidence: "reported",
    sources: ["americanbanker-rto", "levels-fyi", "glassdoor-salary", "posting-278593"],
  },
  {
    title: "Context to know, not to raise",
    body: [
      p("The bank cut about 3,000 roles in late 2025 as part of a restructuring, with the CEO saying the savings free up capacity to invest in technology and sales staff. Some employee reviews mention bureaucracy and slow promotion, and others praise work-life balance and a relatively modern stack. Don't bring any of it up, but don't be surprised if it shapes the questions you get about adaptability."),
    ],
    confidence: "reported",
    sources: ["hcamag-restructuring"],
  },
];

export const REPORTED: ReportedQuestion[] = [
  // Front end
  { text: "Difference between the Context API and Redux.", category: "React", context: "Software Engineer", answer: "sb-react-context-redux", confidence: "reported", sources: ["gd-swe"] },
  { text: "Display a table in a React function component by fetching data from an endpoint.", category: "React", context: "Codility, 80 min", answer: "sb-build-fetch-table", confidence: "reported", sources: ["gd-codility-react"] },
  { text: "Make a counter in a class component.", category: "React", context: "Codility, 80 min", answer: "sb-build-class-counter", confidence: "reported", sources: ["gd-codility-react"] },
  { text: "Build a basic todo app: add a todo, delete a todo, show the remaining ones.", category: "React", context: "Digital Factory / Sr Dev", answer: "sb-build-todo", confidence: "reported", sources: ["gd-digital-factory", "gd-codility-react"] },
  { text: "Difference between `let`, `var` and `const`.", category: "JavaScript", context: "Software Engineer UI/UX, 2024", answer: "sb-js-var-let-const", confidence: "reported", sources: ["gd-uiux"] },
  { text: "Controlled vs uncontrolled components.", category: "React", answer: "sb-react-state-props", confidence: "unverified", sources: ["dataford", "interviewquery"] },
  { text: "How do you manage state in a large React and Redux application?", category: "React", answer: "sb-react-state-placement", confidence: "unverified", sources: ["dataford"] },
  // Back end
  { text: "Make a REST API using Node which returns JSON.", category: "Node", context: "Technical round", answer: "sb-build-node-api", confidence: "reported", sources: ["gd-codility-react"] },
  { text: "Build two APIs, a POST and a GET.", category: "Node", context: "Digital Factory", answer: "sb-build-node-api", confidence: "reported", sources: ["gd-digital-factory"] },
  { text: "What are the four pillars of OOP? What is abstraction?", category: "Java", context: "Software Engineer, Java Co-op", answer: "sb-java-oop", confidence: "reported", sources: ["gd-swe", "gd-java-coop"] },
  { text: "Singleton vs Factory pattern.", category: "Java", context: "Java Co-op", answer: "sb-java-patterns", confidence: "reported", sources: ["gd-java-coop"] },
  { text: "How do you get the sum of a list with the Stream API?", category: "Java", context: "Full Stack Java Developer", answer: "sb-java-streams", confidence: "reported", sources: ["gd-fs-java"] },
  { text: "Full syntax of a RESTful Spring method that maps query parameters to a POJO.", category: "Spring", context: "Java Developer, 2019", answer: "sb-build-spring-query-pojo", confidence: "reported", sources: ["gd-senior-java"] },
  { text: "How would you implement caching? Also multithreading, Spring Security and Spring JPA.", category: "Spring", context: "Senior Java, 2022", answer: "sb-ms-caching", confidence: "unverified", sources: ["gd-senior-java"] },
  // Coding and data
  { text: "Number of Islands (LeetCode medium).", category: "Coding", context: "Intern Codility, 2025", answer: "sb-code-islands", confidence: "reported", sources: ["gd-intern"] },
  { text: "A long final round on one hard intervals problem.", category: "Coding", context: "Intern, 2022", answer: "sb-code-intervals", confidence: "reported", sources: ["gd-intern"] },
  { text: "Code the Fibonacci sequence; odd/even check; sort a linked list and an array.", category: "Coding", context: "Software Developer", answer: "sb-code-fibonacci", confidence: "reported", sources: ["gd-sd"] },
  { text: "An array-manipulation algorithm, explained while coding.", category: "Coding", context: "Technical round", answer: "sb-code-two-sum", confidence: "reported", sources: ["gd-codility-react", "gd-sd"] },
  { text: "Two easy LeetCode problems plus one easy SQL question.", category: "SQL", context: "Software Developer", answer: "sb-sql-group-having", confidence: "reported", sources: ["gd-sd", "gd-swe"] },
  { text: "Find the second highest salary, given the table structure.", category: "SQL", context: "Data Engineer", answer: "sb-sql-second-highest", confidence: "reported", sources: ["gd-data-engineer"] },
  // Architecture, platform, security
  { text: "What's the difference between encoding, encryption and hashing?", category: "Security", context: "Software Developer, 2026", answer: "sb-sec-encoding-encryption-hashing", confidence: "reported", sources: ["internia-2026"] },
  { text: "Using a whiteboard, describe the deployment process of a new system into production.", category: "DevOps", answer: "sb-cicd-pipeline", confidence: "reported", sources: ["gd-sd"] },
  { text: "How do load balancers work?", category: "Platform", answer: "sb-cloud-load-balancer", confidence: "unverified", sources: ["interviewquery"] },
  { text: "Design a payment system with ids formatted as country code, provider and sequence number.", category: "Design", answer: "sb-design-transfer", confidence: "unverified", sources: ["interviewquery"] },
  // Behavioural
  { text: "Why do you want to work at Scotiabank?", category: "Behavioural", context: "Most frequently reported", answer: "sb-beh-why-scotiabank", confidence: "reported", sources: ["gd-sd", "gd-swe"] },
  { text: "Tell me about a time you had a conflict at work and how you solved it.", category: "Behavioural", answer: "sb-beh-conflict", confidence: "reported", sources: ["gd-sd"] },
  { text: "A time you were not able to deliver a project on time; conflicting deadlines from different managers.", category: "Behavioural", answer: "sb-beh-deadline", confidence: "reported", sources: ["gd-sd"] },
  { text: "Tell me about yourself, and a time you dealt with a difficult stakeholder.", category: "Behavioural", answer: "sb-beh-stakeholder", confidence: "reported", sources: ["gd-sd"] },
  { text: "Tell me about a time you improved developer tooling or build speed for your team.", category: "Behavioural", context: "2026", answer: "sb-beh-improve", confidence: "reported", sources: ["internia-2026"] },
  { text: "Learning something new; situational scenarios; Scotiabank's core values.", category: "Behavioural", context: "2026", answer: "sb-beh-learn", confidence: "reported", sources: ["internia-2026"] },
  { text: "How would you implement a feature you were given full ownership of?", category: "Behavioural", context: "Developer, 2025", answer: "sb-beh-ownership", confidence: "reported", sources: ["gd-sd"] },
  { text: "Where do you see yourself in five years?", category: "Behavioural", answer: "sb-beh-five-years", confidence: "reported", sources: ["gd-senior-sd"] },
  { text: "A deep dive into your past projects.", category: "Resume", context: "Full Stack Developer, Mar 2025", answer: "sb-beh-project", confidence: "reported", sources: ["gd-fsd"] },
];
