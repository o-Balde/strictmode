import type { StackArea } from "./types";

/** What the team, and the bank around it, actually runs, area by area. */
export const STACK: StackArea[] = [
  {
    id: "stack-frontend",
    title: "Front end",
    items: [
      {
        name: "React, Next.js, TypeScript, ES6+",
        note: "The core of the role. Next.js often serves as the BFF as well as the UI. Expect both function components and some legacy class components.",
        confidence: "official",
        sources: ["posting-278593", "posting-gwe-senior"],
      },
      {
        name: "Redux, Webpack",
        note: "Listed on the GWE senior posting. Know Redux Toolkit's slice, selector and thunk model, and why Context alone isn't a store.",
        confidence: "official",
        sources: ["posting-gwe-senior"],
      },
      {
        name: "Jest, React Testing Library",
        note: "Named on a product-onboarding posting. Query by role and label, test behaviour, not implementation.",
        confidence: "official",
        sources: ["posting-onboarding-senior"],
      },
      {
        name: "WCAG 2.1 AA and a bank-wide accessibility standard",
        note: "The 2026–2029 Accessibility Plan trains everyone who builds digital technology on WCAG 2.1 AA and EN 301 549. Onboarding forms are exactly where this matters.",
        confidence: "official",
        sources: ["accessibility-plan"],
      },
    ],
  },
  {
    id: "stack-backend",
    title: "Back end and APIs",
    items: [
      {
        name: "Node.js backend-for-frontend layers",
        note: "Thin Node or Next.js services that aggregate microservices for one screen and keep tokens on the server.",
        confidence: "official",
        sources: ["posting-gwe-senior", "posting-onboarding-senior"],
      },
      {
        name: "Java and Spring Boot microservices",
        note: "Spring Boot, Spring Cloud, JUnit, Mockito, Maven or Gradle across tech postings. The bank built internal Spring Boot accelerators ('Chassis', 'AppFactory') years ago.",
        confidence: "official",
        sources: ["posting-278593", "posting-payments", "infoq-chassis"],
      },
      {
        name: "API gateway (Apigee, IBM DataPower)",
        note: "A platform team runs the bank's API gateway on Apigee, with DataPower in older estates. Your APIs likely sit behind it, which handles TLS, tokens and rate limits.",
        confidence: "unverified",
        sources: ["apigee-snippet"],
      },
    ],
  },
  {
    id: "stack-events",
    title: "Event streaming",
    items: [
      {
        name: "Kafka and Google Pub/Sub",
        note: "Both appear in GWE postings. Onboarding services integrate through events, so at-least-once delivery and idempotent consumers are table stakes.",
        confidence: "official",
        sources: ["posting-278593", "posting-gwe-senior"],
      },
      {
        name: "Azure Event Hub",
        note: "On the GWE senior posting: Kafka-compatible streaming on Azure.",
        confidence: "official",
        sources: ["posting-gwe-senior"],
      },
      {
        name: "Confluent",
        note: "The bank's fraud technology team presents on Confluent and Kafka event streaming, and the wealth data platform lists Kafka/Confluent.",
        confidence: "reported",
        sources: ["confluent-fraud", "posting-wealth-data"],
      },
    ],
  },
  {
    id: "stack-data",
    title: "Data",
    items: [
      {
        name: "PostgreSQL, Azure SQL, MongoDB",
        note: "The operational databases in the posting. Oracle also appears in payments.",
        confidence: "official",
        sources: ["posting-278593", "posting-payments"],
      },
      {
        name: "A wealth client-data hub on Google Cloud",
        note: "The 2024 Google Cloud partnership included 'the first cloud-based client data hub for Scotiabank's Wealth Management business'. The wealth data team lists BigQuery, Dataflow, Spanner, Databricks and dbt.",
        confidence: "official",
        sources: ["google-cloud-2024", "posting-wealth-data"],
      },
    ],
  },
  {
    id: "stack-cloud",
    title: "Cloud",
    items: [
      {
        name: "Google Cloud: Cloud Run, Cloud Functions, Cloud Storage, BigQuery, IAM",
        note: "Google Cloud is the 'enterprise cloud platform of choice' (April 2024), with a goal of moving most systems to the cloud. Expect BFFs and services as stateless containers on Cloud Run.",
        confidence: "official",
        sources: ["google-cloud-2024", "posting-gwe-senior"],
      },
      {
        name: "Azure: App Service, Key Vault, Azure SQL",
        note: "Still active in team stacks, especially for secrets in Key Vault. OSFI's B-10 guideline on concentration risk makes a multi-cloud setup normal for a bank.",
        confidence: "official",
        sources: ["posting-278593", "posting-gwe-senior", "osfi-b10"],
      },
    ],
  },
  {
    id: "stack-devops",
    title: "Delivery and operations",
    items: [
      {
        name: "Jenkins, GitHub Actions, Bitbucket",
        note: "Two CI systems and two Git hosts, which suggests a migration in progress. Be comfortable with either a `Jenkinsfile` or a workflow YAML.",
        confidence: "official",
        sources: ["posting-278593", "posting-gwe-senior"],
      },
      {
        name: "Docker, Kubernetes, Terraform, Argo CD",
        note: "Containers everywhere, infrastructure as code across Azure and GCP, GitOps deploys in payments.",
        confidence: "official",
        sources: ["posting-gwe-senior", "posting-payments"],
      },
      {
        name: "Splunk and Dynatrace",
        note: "Logs in Splunk, APM and tracing in Dynatrace: name them when you describe debugging a production issue.",
        confidence: "official",
        sources: ["posting-gwe-senior", "medium-velocity"],
      },
    ],
  },
  {
    id: "stack-security",
    title: "Security",
    items: [
      {
        name: "OAuth2, JWT, TLS",
        note: "In the entry-level requirements, unusually. Session management and encryption also appear on the onboarding and senior postings.",
        confidence: "official",
        sources: ["posting-278593", "posting-onboarding-senior"],
      },
      {
        name: "Fortify (SAST) and BlackDuck (open-source scanning)",
        note: "Scanning gates in the pipeline. Expect your pull requests to have findings to fix, and say you welcome that.",
        confidence: "official",
        sources: ["posting-gwe-senior"],
      },
    ],
  },
  {
    id: "stack-ai",
    title: "AI in the workflow",
    items: [
      {
        name: "Scotia Intelligence and Scotia Navigator",
        note: "A bank-wide AI programme launched in April 2026, including AI coding assistance for technology teams. In Scotia Wealth Management, about 70% of staff use AI daily.",
        confidence: "official",
        sources: ["scotia-intelligence", "wealthprofessional-ai"],
      },
    ],
  },
];
