import { bash, dockerfile, list, p, say, steps, table, trap, yaml } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_CLOUD: PrepSection = {
  id: "sb-cloud",
  track: "platform",
  title: "Google Cloud and Azure",
  blurb:
    "The posting asks for the basics of both clouds: Cloud Run and Cloud Functions on Google Cloud, App Services and Key Vault on Azure. Google Cloud is the bank's stated 'enterprise cloud platform of choice', and Azure is still in active use. Know what each service is for and how a service gets its secrets.",
  questions: [
    {
      id: "sb-cloud-run-vs-functions",
      question: "Cloud Run vs Cloud Functions vs GKE: which would you use for what?",
      level: "junior",
      short:
        "**Cloud Run** runs any stateless container over HTTP or events, scales with traffic (down to zero if allowed), and charges per use. It is the default for a Spring Boot API or a Next.js/Node BFF. **Cloud Functions** (now Cloud Run functions) run a single function in response to an event: a Pub/Sub message, a file landing in Cloud Storage, an HTTP call. Use them for small glue code. **GKE** is managed Kubernetes, for when you need full control of the cluster.",
      body: [
        table(
          ["Need", "Pick", "Why"],
          ["REST API / BFF in a container", "Cloud Run", "Any language, autoscaling, no cluster to run"],
          ["Scan each uploaded ID document", "Cloud Function on a Storage event", "A small, event-triggered piece of code"],
          ["React to an `AccountOpened` Pub/Sub event", "Function, or Cloud Run with a push subscription", "Managed retries, dead-letter topic"],
          ["Long-running workers, sidecars, custom networking", "GKE", "Full Kubernetes control"],
          ["Static front end", "Cloud Storage + CDN, or Cloud Run for SSR", "Next.js SSR needs a server"],
        ),
        p("Cloud Functions 2nd gen was rebranded Cloud Run functions in 2024. It runs on Cloud Run underneath, so the scaling and concurrency model is the same."),
      ],
    },
    {
      id: "sb-cloud-run-details",
      question: "What should you know before deploying a service to Cloud Run?",
      level: "intermediate",
      short:
        "The container must listen on `$PORT`, keep no state on local disk or in memory between requests, and start fast. Cloud Run scales the number of instances with traffic. Each instance can serve many requests at once (concurrency, 80 by default), so the code must be thread-safe or async. Cold starts are the price of scaling to zero; `min-instances` keeps some warm. On scale-down, it sends `SIGTERM` and gives the container 10 seconds to finish.",
      body: [
        bash(`
gcloud run deploy onboarding-bff \\
  --image=northamerica-northeast2-docker.pkg.dev/my-proj/apps/onboarding-bff:1.4.2 \\
  --region=northamerica-northeast2 \\
  --service-account=onboarding-bff@my-proj.iam.gserviceaccount.com \\
  --set-secrets=API_CLIENT_SECRET=onboarding-client-secret:latest \\
  --min-instances=1 --concurrency=80 --no-allow-unauthenticated
`),
        list(
          "**Identity:** every service runs as its own service account, with least-privilege IAM roles. No key files.",
          "**Secrets:** mount them from Secret Manager (`--set-secrets`). Never bake them into the image.",
          "**Region:** `northamerica-northeast1` is Montréal and `-northeast2` is Toronto. Client data residency matters to a Canadian bank.",
          "**Spring Boot on Cloud Run:** JVM startup and memory make cold starts expensive, so tune the heap, consider CDS or AOT, or keep a minimum number of instances warm.",
        ),
      ],
    },
    {
      id: "sb-azure-app-service",
      question: "What is Azure App Service, and how do you deploy to it safely?",
      level: "junior",
      short:
        "App Service is Azure's managed web hosting: you deploy code or a container, and Azure runs it, scales it, patches the OS and terminates TLS. The features that come up in interviews are **app settings**, which arrive as environment variables and can point at Key Vault; **managed identity**, so the app gets tokens for other Azure resources without a password; and **deployment slots**, which let you deploy to a staging slot, warm it up, then swap it into production with no downtime and roll back by swapping again.",
      body: [
        list(
          "Scale up (a bigger plan) or scale out (more instances, with autoscale rules).",
          "Health check path: unhealthy instances are taken out of rotation.",
          "Restrict who can reach it with VNet integration and private endpoints. Internal bank apps shouldn't be on the public internet.",
        ),
      ],
    },
    {
      id: "sb-azure-key-vault",
      question: "What is Azure Key Vault, and how does an app read a secret from it?",
      level: "junior",
      short:
        "Key Vault is a managed, access-controlled store for **secrets** (connection strings, API keys), **keys** (for encryption and signing, which can be HSM-backed) and **certificates** (TLS). An app authenticates with its **managed identity**, so no credential is stored anywhere. RBAC grants that identity read access to specific secrets. The app reads them at runtime through the SDK, through App Service Key Vault references, or through Spring Cloud Azure. Every access is logged, and secrets can be rotated without redeploying.",
      body: [
        yaml(
          `
# App Service app setting that resolves from Key Vault at runtime
DB_PASSWORD: "@Microsoft.KeyVault(SecretUri=https://gwe-onboarding-kv.vault.azure.net/secrets/db-password/)"
`,
          { caption: "Key Vault reference" },
        ),
        trap("Copying the secret into a pipeline variable or a `.env` file 'just for now'. A bank's controls (OSFI B-13 expects privileged credentials to be stored in a vault) assume secrets live only in the vault."),
      ],
    },
    {
      id: "sb-cloud-secrets",
      question: "Where should secrets live, and what do you do if one leaks?",
      level: "junior",
      short:
        "In a vault (Key Vault, Secret Manager), read at runtime by a workload identity, scoped per environment and per service, and rotated regularly. They don't belong in code, Git history, container images, logs or front-end bundles. If one leaks: **revoke and rotate it immediately**, find out where it was used and what it could reach, review the access logs, purge it from history, and add secret scanning in pre-commit and CI so it can't happen again.",
      body: [
        p("Banks have been caught out here before. In 2019, Scotiabank source code and credentials were found in public GitHub repositories and taken down. Secret scanning and vault discipline exist because of incidents like that, and you can mention it as a lesson the industry learned."),
      ],
    },
    {
      id: "sb-cloud-multicloud",
      question: "Why would a bank run on both Google Cloud and Azure?",
      level: "intermediate",
      short:
        "Partly history, partly strategy. In 2024 Scotiabank named Google Cloud its 'enterprise cloud platform of choice', including a cloud client-data hub for Wealth Management, but Azure services (App Service, Key Vault, Azure SQL, Event Hub) are still in team stacks, and core systems stay on premises. Canada's banking regulator, OSFI, asks banks in guideline B-10 to manage concentration risk and plan exits from cloud providers, which favours portable designs: containers, Terraform, open protocols.",
      body: [
        say("I'd write services as portable twelve-factor containers, keep the cloud-specific parts behind small adapters, and let the platform team decide where each one runs."),
      ],
    },
    {
      id: "sb-cloud-load-balancer",
      question: "How does a load balancer work?",
      level: "junior",
      short:
        "It sits in front of several instances and spreads requests across the healthy ones (round robin, least connections, or by a hash of the client), so you can scale out and survive instance failures. Health checks take bad instances out of rotation. A layer 4 balancer routes TCP connections. A layer 7 balancer understands HTTP: it routes by path or host, terminates TLS, and can add a WAF. Cloud Run, App Service and Kubernetes Services all include one.",
      body: [
        list(
          "**Sticky sessions** pin a user to one instance. Avoid them by keeping services stateless, with sessions in a token or a shared store.",
          "Health checks should test that the instance can actually serve, which is readiness, without failing just because a dependency is slow.",
        ),
      ],
    },
  ],
};

export const SB_DEVOPS: PrepSection = {
  id: "sb-devops",
  track: "platform",
  title: "Git, CI/CD, Docker and Kubernetes",
  blurb:
    "The posting lists Git, Jenkins and GitHub Actions. Docker and Kubernetes are assets, and the senior posting adds Bitbucket and Terraform, plus Fortify and BlackDuck scans in the pipeline. One candidate was asked to 'describe the deployment process of the new system into production' on a whiteboard.",
  questions: [
    {
      id: "sb-git-workflow",
      question: "Walk me through your Git workflow. Merge vs rebase?",
      level: "junior",
      short:
        "Branch from `main` for each story, commit small and often with clear messages, rebase on `main` to keep up, push, open a pull request, pass CI and review, then squash or merge. **Merge** keeps history exactly as it happened, plus a merge commit. **Rebase** replays your commits on top of the target for a linear history. Never rebase a branch that someone else has based work on.",
      body: [
        bash(`
git switch -c feature/GWE-482-joint-account-step
git add -p                              # stage hunks deliberately
git commit -m "Add joint holder step to onboarding wizard"
git fetch origin && git rebase origin/main
git push -u origin feature/GWE-482-joint-account-step
# conflict during a rebase: fix the files, then
git add <files> && git rebase --continue
`),
        list(
          "**Trunk-based development:** short-lived branches, feature flags, `main` always releasable. **GitFlow:** long-lived `develop` and release branches. It's common in regulated release trains.",
          "Undo safely with `git revert` for shared history. `git reset` and `git push --force-with-lease` belong only on your own branch.",
        ),
      ],
    },
    {
      id: "sb-cicd-pipeline",
      question: "Describe a CI/CD pipeline that takes a change to production.",
      level: "junior",
      short:
        "Every push runs CI: build, lint, unit tests, static analysis and security scans (SAST such as Fortify, and dependency scanning such as BlackDuck or Dependabot). Then the pipeline builds an immutable container image tagged with the commit SHA, scans it, and pushes it to a registry. CD deploys **that same image** to dev, test and prod, running integration and smoke tests along the way. In a bank, production needs a change record and an approval from someone other than the author.",
      body: [
        steps(
          "A PR opens: CI runs build, lint, unit tests, SAST, dependency and secret scans, and coverage gates.",
          "Review approves and the PR merges to `main`. The image is built once (`app:3f9c2ab`) and pushed to the registry.",
          "Auto-deploy to dev and run integration tests. Promote the same image to QA/UAT for business sign-off.",
          "Production: a change ticket and an approval gate (segregation of duties), then a blue-green or canary deploy, smoke tests, and monitoring for a rollback signal.",
        ),
        yaml(
          `
name: ci
on:
  pull_request:
  push:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm test -- --coverage
      - run: npm audit --audit-level=high

  image:
    needs: build-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write          # OIDC to the cloud: no long-lived keys in secrets
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t onboarding-bff:\${{ github.sha }} .
`,
          { caption: "GitHub Actions" },
        ),
        say("Build once and promote the same artifact. What I tested in QA has to be byte-for-byte what goes to production."),
      ],
    },
    {
      id: "sb-jenkins",
      question: "Jenkins vs GitHub Actions?",
      level: "junior",
      short:
        "Both run pipelines-as-code. **Jenkins** is self-hosted and extended with plugins, and its pipelines live in a `Jenkinsfile` (Groovy) with stages and agents. Banks have years of shared Jenkins libraries and on-prem agents that can reach internal systems. **GitHub Actions** is built into GitHub, uses YAML workflows and reusable actions, and can run on hosted or self-hosted runners. Many banks run both while they migrate.",
      body: [
        p("A Jenkins declarative pipeline reads like the YAML above: `pipeline { agent any; stages { stage('Test') { steps { sh 'mvn -B verify' } } } }`. Shared libraries hold the bank's standard build, scan and deploy steps, so each team's file stays short."),
      ],
    },
    {
      id: "sb-docker",
      question: "What is Docker? Write a production Dockerfile for a Node or Spring service.",
      level: "junior",
      short:
        "A container image packages an app with its runtime and dependencies, as immutable layers. A container is a running instance of an image: an isolated process sharing the host's kernel, which makes it far lighter than a VM, which has a whole guest operating system. Good images are small, built in multiple stages, run as a non-root user, use pinned base images, contain no secrets, and handle `SIGTERM`.",
      body: [
        dockerfile(
          `
# build stage: full JDK and Maven
FROM eclipse-temurin:21-jdk AS build
WORKDIR /src
COPY pom.xml .
RUN ./mvnw -q dependency:go-offline || true
COPY . .
RUN ./mvnw -q -DskipTests package

# runtime stage: JRE only, non-root
FROM eclipse-temurin:21-jre
RUN useradd --system --uid 10001 app
WORKDIR /app
COPY --from=build /src/target/onboarding-service.jar app.jar
USER app
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
`,
          { caption: "Multi-stage Spring Boot image" },
        ),
        trap("`COPY . .` before installing dependencies breaks layer caching, so every code change reinstalls everything. Also leaving `.env` or `.git` out of `.dockerignore`, which copies them into the image."),
      ],
    },
    {
      id: "sb-kubernetes",
      question: "Explain the Kubernetes basics: pod, deployment, service, probes.",
      level: "intermediate",
      short:
        "A **Pod** is the smallest unit: one or more containers sharing a network and storage. A **Deployment** keeps N replicas of a pod running and rolls out new versions gradually. A **Service** gives those pods one stable address and load-balances across them. An **Ingress** or gateway routes outside HTTP traffic in. **ConfigMaps** and **Secrets** inject configuration. **Liveness** and **readiness** probes tell Kubernetes when to restart a pod and when to send it traffic. An **HPA** scales replicas on CPU or custom metrics.",
      body: [
        yaml(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: onboarding-service
spec:
  replicas: 3
  selector:
    matchLabels: { app: onboarding-service }
  template:
    metadata:
      labels: { app: onboarding-service }
    spec:
      containers:
        - name: app
          image: registry.example/onboarding-service:3f9c2ab
          ports: [{ containerPort: 8080 }]
          resources:
            requests: { cpu: "250m", memory: "512Mi" }
            limits: { memory: "1Gi" }
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8080 }
          livenessProbe:
            httpGet: { path: /actuator/health/liveness, port: 8080 }
---
apiVersion: v1
kind: Service
metadata:
  name: onboarding-service
spec:
  selector: { app: onboarding-service }
  ports: [{ port: 80, targetPort: 8080 }]
`),
      ],
    },
    {
      id: "sb-deploy-strategies",
      question: "Blue-green, canary, rolling: how do you release safely and roll back?",
      level: "intermediate",
      short:
        "A **rolling** update replaces instances a few at a time: no extra capacity needed, but two versions serve traffic at once. **Blue-green** runs the new version next to the old one, then switches all traffic at once; rolling back is switching back. **Canary** sends a small share of traffic (say 5%) to the new version, watches errors and latency, then increases it. Every strategy needs backwards-compatible database changes: expand first, migrate, then contract.",
      body: [
        list(
          "Feature flags separate **deploy** from **release**: the code ships switched off and is turned on for a pilot group of advisors first.",
          "Database migrations (Flyway or Liquibase) must work with both the old and the new version of the app while both are running.",
        ),
      ],
    },
    {
      id: "sb-terraform",
      question: "What is infrastructure as code, and why Terraform?",
      level: "junior",
      short:
        "Infrastructure as code means describing cloud resources (Cloud Run services, buckets, IAM, Key Vaults) in versioned files that go through review and CI, instead of clicking in a console. Terraform is declarative and works across providers. `plan` shows the difference between the code and what exists, and `apply` makes the change, tracked in a state file. Environments stay reproducible, every change is reviewed and audited, and drift becomes visible, which matters to a regulated bank.",
      body: [],
    },
  ],
};
