import { bash, concept, dockerfile, groovy, json, pair, qa, table, trap, ts, yaml } from "./authoring";
import type { StudyTopic } from "./types";

export const CLOUD: StudyTopic = {
  id: "cloud",
  short: "Cloud",
  title: "Google Cloud and Microsoft Azure",
  jd: "Google Cloud: Cloud Run, Cloud Functions basics · Microsoft Azure: App Services, Key Vault basics",
  weight: "familiar",
  summary:
    "The posting asks for basics on both clouds: Google Cloud, which Scotiabank calls its enterprise cloud platform of choice, for containers and functions, and Azure for web apps and secrets. Be ready to say what each service is for, how it scales, how a deployment rolls out without downtime, and how an app gets a secret without a password in its code.",
  concepts: [
    concept("IaaS, PaaS, FaaS and serverless", "**IaaS**: you rent VMs and manage the OS (Compute Engine, Azure VMs). **PaaS**: you bring code, the platform runs it (App Service). **FaaS**: you bring a function, triggered by events (Cloud Run functions). **Serverless**: no servers to size, scale-to-zero, pay per use: Cloud Run is serverless containers."),
    concept("Cloud Run", "Runs any stateless container that listens on the port in `$PORT`. It scales instances automatically with traffic, down to zero; each instance serves up to 80 concurrent requests by default. You pay mainly while requests are being handled."),
    concept("Cloud Run services and jobs", "A **service** serves HTTP requests at a stable HTTPS URL. A **job** runs containers to completion, such as a nightly reconciliation or a batch import, optionally in parallel tasks, on demand or on a schedule."),
    concept("Revisions and traffic splitting", "Every deploy creates an immutable **revision**. Traffic can be split by percentage between revisions for a canary, sent to a tagged revision's own URL for testing, or moved back to the previous revision to roll back instantly."),
    concept("Cold starts and min instances", "Scaling from zero means starting a container on the first request: a cold start, slower for big JVM apps. Mitigate with `--min-instances`, a smaller image, faster startup (lazy initialisation, CDS or native images for Java), and startup CPU boost."),
    concept("Cloud Run functions", "Formerly Cloud Functions, renamed in 2024. You write one function (HTTP or event), deploy the source, and Google builds it into a container on Cloud Run. Triggers include HTTP, Pub/Sub, Cloud Storage and any Eventarc source. Good for small glue code."),
    concept("Service accounts and IAM", "On Google Cloud, a workload runs as a **service account**, granted IAM roles on exactly the resources it needs (least privilege). Code picks the identity up automatically (Application Default Credentials): no key files."),
    concept("Secret Manager", "Google Cloud's store for secrets: versioned, encrypted, access controlled by IAM and audited. Cloud Run can mount a secret as an environment variable or a file at deploy time."),
    concept("Azure App Service", "Azure's PaaS for web apps and APIs: deploy code (Java, Node, .NET, Python) or a container, and Azure handles the OS, patching, load balancing, TLS certificates and scaling."),
    concept("App Service plan", "The compute an app runs on: region, OS, pricing tier, instance size and count. Several apps can share a plan, and its resources. **Scale up**: a bigger tier. **Scale out**: more instances, manually or by autoscale rules."),
    concept("Deployment slots", "Live copies of an app with their own hostnames, such as `staging` (Standard tier and above). Deploy to staging, warm it up and test, then **swap** with production: no downtime, and swapping back is the rollback. Settings can be sticky to a slot."),
    concept("Azure Key Vault", "A managed vault for **secrets** (passwords, connection strings), **keys** (for encryption and signing, HSM-backed in Premium) and **certificates** (TLS, with auto-renewal). Every access is authorised through Microsoft Entra ID and can be logged."),
    concept("Key Vault access: RBAC vs access policies", "Azure RBAC roles, such as Key Vault Secrets User, are the recommended model and the default for new vaults since API version 2026-02-01. Vault access policies are the older model. Either way, grant identities the least they need."),
    concept("Managed identities", "An identity Azure creates for a resource such as a web app, in Microsoft Entra ID. Grant it a role on the Key Vault, and the app authenticates with no credentials stored anywhere. `DefaultAzureCredential` in the SDKs finds it automatically."),
    concept("Key Vault references", "An App Service setting whose value is `@Microsoft.KeyVault(VaultName=...;SecretName=...)`. App Service resolves it through the app's managed identity, and the app reads a plain environment variable, with no SDK and no secret in configuration."),
    concept("Soft delete and purge protection", "Deleted vaults and secrets are recoverable for a retention period (soft delete, always on). Purge protection stops anyone from permanently deleting them before that period ends: important for keys that encrypt data."),
    concept("Twelve-factor configuration", "Build one artifact and configure it per environment through environment variables and secret stores, never by rebuilding or committing secrets. That's what makes the same image deployable to dev, staging and production."),
  ],
  parts: [
    {
      id: "cloud-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Cloud Run service", "Cloud Run functions", "Azure App Service", "Kubernetes (GKE, AKS)"],
          ["You deploy", "A container image", "Function source code", "Code or a container", "Containers plus manifests"],
          ["Scales", "Automatically, to zero", "Automatically, to zero", "Plan instances, autoscale rules", "Whatever you configure (HPA)"],
          ["Pay for", "Request time (mostly)", "Request time", "The plan, running or not", "The cluster's nodes"],
          ["Zero-downtime release", "Revisions and traffic split", "New revision", "Deployment slots and swap", "Rolling updates"],
          ["Good for", "APIs, BFFs, web apps", "Event glue: a file landed, a message arrived", "Web apps and APIs on Azure", "Many services needing fine control"],
          ["You manage", "The container", "The function", "The app and its plan", "A lot: the cluster, networking, upgrades"],
        ),
        table(
          ["Need", "Google Cloud", "Azure", "AWS"],
          ["Serverless containers", "Cloud Run", "Container Apps", "App Runner, Fargate"],
          ["Functions", "Cloud Run functions", "Azure Functions", "Lambda"],
          ["Web app PaaS", "App Engine, Cloud Run", "App Service", "Elastic Beanstalk"],
          ["Managed Kubernetes", "GKE", "AKS", "EKS"],
          ["Secrets", "Secret Manager", "Key Vault", "Secrets Manager"],
          ["Encryption keys", "Cloud KMS", "Key Vault keys, Managed HSM", "KMS"],
          ["Messaging", "Pub/Sub", "Service Bus, Event Hubs, Event Grid", "SQS, SNS, Kinesis"],
          ["Managed PostgreSQL", "Cloud SQL, AlloyDB", "Azure Database for PostgreSQL", "RDS, Aurora"],
          ["Managed SQL Server", "Cloud SQL for SQL Server", "Azure SQL Database, Managed Instance", "RDS for SQL Server"],
          ["Workload identity", "Service accounts", "Managed identities", "IAM roles"],
          ["Logs and metrics", "Cloud Logging, Monitoring", "Azure Monitor, Application Insights", "CloudWatch"],
        ),
      ],
    },
    {
      id: "cloud-commands",
      title: "What it looks like",
      blocks: [
        bash(`
# deploy a new revision from source, receiving no traffic yet
gcloud run deploy onboarding-api \\
  --source . \\
  --region northamerica-northeast2 \\
  --service-account onboarding-api@my-project.iam.gserviceaccount.com \\
  --set-secrets DB_PASSWORD=onboarding-db-password:latest \\
  --min-instances 1 --max-instances 20 --concurrency 80 \\
  --no-traffic --tag canary

# send 10% of traffic to it, then everything
gcloud run services update-traffic onboarding-api --region northamerica-northeast2 --to-tags canary=10
gcloud run services update-traffic onboarding-api --region northamerica-northeast2 --to-latest
`, { caption: "Cloud Run: a canary release in Toronto (northamerica-northeast2)" }),
        bash(`
# give the web app an identity, and that identity read access to the vault's secrets
az webapp identity assign --name onboarding-web --resource-group rg-onboarding
az role assignment create --role "Key Vault Secrets User" \\
  --assignee <principal-id-from-above> \\
  --scope "$(az keyvault show --name kv-onboarding --query id -o tsv)"

# the app reads DB_PASSWORD as a normal environment variable
az webapp config appsettings set --name onboarding-web --resource-group rg-onboarding \\
  --settings DB_PASSWORD="@Microsoft.KeyVault(VaultName=kv-onboarding;SecretName=db-password)"

# after deploying to the staging slot and checking it: swap into production
az webapp deployment slot swap --name onboarding-web --resource-group rg-onboarding \\
  --slot staging --target-slot production
`, { caption: "Azure: managed identity, a Key Vault reference, and a slot swap" }),
        ts(`
import { DefaultAzureCredential } from "@azure/identity";
import { SecretClient } from "@azure/keyvault-secrets";

// locally this uses your az login; in App Service, the app's managed identity
const vault = new SecretClient("https://kv-onboarding.vault.azure.net", new DefaultAzureCredential());
const password = (await vault.getSecret("db-password")).value;
`, { caption: "Reading a secret from code, with no credentials in it" }),
        trap("Cloud Run sends `SIGTERM` and allows about ten seconds before killing an instance, and instances can be stopped at any time. Keep no state in memory or on local disk that you can't lose."),
      ],
    },
    {
      id: "cloud-before-after",
      title: "Before and after",
      pairs: [
        pair("A password in a committed config file to a Key Vault reference", "App Service Key Vault references", "The file in the repository holds no secret. App Service resolves the reference through the app's managed identity and hands the app a normal connection string; rotation happens in the vault. For Azure SQL, Entra authentication with the managed identity removes the password entirely.", {
          before: json(`
{
  "ConnectionStrings": {
    "Onboarding": "Server=tcp:sql-onboarding.database.windows.net;Database=onboarding;User ID=app;Password=S3cr3t!"
  }
}
`, { caption: "appsettings.json, committed" }),
          after: bash(`
# set on the App Service, not in the repository
az webapp config connection-string set --name onboarding-web --resource-group rg-onboarding \\
  --connection-string-type SQLAzure \\
  --settings Onboarding="@Microsoft.KeyVault(VaultName=kv-onboarding;SecretName=onboarding-connection)"
`),
        }),
        pair("A service-account key file to an attached identity", "Application Default Credentials", "Downloaded JSON keys leak through laptops, images and repositories, and never expire. A Cloud Run service runs as its attached service account, and the client libraries pick it up automatically.", {
          before: bash(`
gcloud iam service-accounts keys create key.json --iam-account onboarding@my-project.iam.gserviceaccount.com
export GOOGLE_APPLICATION_CREDENTIALS=key.json # copied into the image, committed by mistake...
`),
          after: bash(`
gcloud run deploy onboarding-api --source . \\
  --service-account onboarding@my-project.iam.gserviceaccount.com
# the code calls the client library with no credentials: it uses the attached identity
`),
        }),
      ],
    },
  ],
  questions: [
    qa("What is serverless?", "You deploy code or a container and the provider runs, scales and patches the servers: you don't size machines, it scales with traffic (often to zero), and you pay for use. Cloud Run, Cloud Run functions and Azure Functions are serverless; App Service is PaaS with a plan you pay for whether busy or not."),
    qa("Cloud Run vs Cloud Run functions?", "Cloud Run runs any container: any language, framework or binary, serving many routes, with full control of the image. Cloud Run functions take a single function's source and build the container for you, wired to triggers such as Pub/Sub or Cloud Storage. Both now run on the same platform."),
    qa("How does Cloud Run scale?", "By request load: it adds instances when concurrent requests exceed each instance's concurrency (80 by default), down to zero when idle. Set `--max-instances` to protect a database downstream, and `--min-instances` to keep warm instances and avoid cold starts."),
    qa("How do you do a zero-downtime deployment on Cloud Run? And on App Service?", "Cloud Run: deploy a new revision with `--no-traffic`, test its tagged URL, shift a percentage of traffic, watch errors and latency, then move all traffic, or roll back to the previous revision instantly. App Service: deploy to a staging slot, warm it up, then swap slots; swap back to roll back."),
    qa("What's an App Service plan?", "The set of compute resources apps run on: region, OS, pricing tier, instance size and count. Apps on the same plan share its instances. Scale up by changing the tier, scale out by adding instances; deployment slots need Standard tier or above."),
    qa("What is Key Vault, and how does an app read a secret without a password?", "Azure's managed store for secrets, keys and certificates. Give the app a managed identity, grant that identity the Key Vault Secrets User role, then read the secret with the SDK and `DefaultAzureCredential`, or use a Key Vault reference in an app setting. No credential is ever stored."),
    qa("Key Vault RBAC vs access policies?", "Access policies are the older, vault-specific permission lists. Azure RBAC uses standard role assignments, can be scoped down to a single secret, and is managed like every other Azure permission. RBAC is recommended and, from API version 2026-02-01, the default for new vaults."),
    qa("What's a managed identity?", "An identity in Microsoft Entra ID tied to an Azure resource, system-assigned (lives and dies with the resource) or user-assigned (shared and reusable). The resource gets tokens for it automatically, so it can call Key Vault, SQL or Storage with no secrets."),
    qa("Where should configuration live, and where secrets?", "Non-secret configuration in environment variables or app settings per environment. Secrets in Key Vault or Secret Manager, injected at deploy time or read at run time by the workload's identity. Never in the repository, the container image, or logs."),
    qa("Why must Cloud Run services be stateless?", "Instances are created and destroyed with traffic, any request can land on any instance, and local disk is in memory and disappears. Keep sessions, files and caches in Firestore, Cloud SQL, Memorystore or Cloud Storage."),
    qa("What causes cold starts, and how do you reduce them?", "A new instance must pull the image, start the runtime and initialise the app before serving its first request. Use minimum instances, a smaller image, lazy initialisation, startup CPU boost, and for Java, class data sharing or a native image."),
    qa("IaaS vs PaaS vs SaaS?", "IaaS: virtual machines, networks and disks, you manage the OS upward. PaaS: you deploy apps, the platform manages servers and runtime (App Service, Cloud Run). SaaS: a finished application you just use (Microsoft 365, Salesforce). Responsibility shifts to the provider at each step."),
    qa("How would you secure a service on Cloud Run?", "Run as a dedicated service account with minimal IAM roles; take secrets from Secret Manager; restrict ingress (internal, or behind a load balancer with Cloud Armor); require authentication with IAM or verify JWTs in the app; reach databases over private networking; and scan the image."),
  ],
  news: [
    { text: "Cloud Functions became Cloud Run functions in August 2024: second-generation functions are now Cloud Run services built from source, with access to Cloud Run features.", url: "https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions" },
    { text: "From Key Vault API version 2026-02-01, new vaults default to Azure RBAC instead of access policies; existing vaults keep their current model.", url: "https://learn.microsoft.com/en-us/azure/key-vault/general/access-control-default" },
  ],
  docs: [
    { label: "Cloud Run documentation", url: "https://cloud.google.com/run/docs" },
    { label: "Cloud Run functions documentation", url: "https://cloud.google.com/functions/docs" },
    { label: "Azure App Service documentation", url: "https://learn.microsoft.com/en-us/azure/app-service/" },
    { label: "Azure Key Vault documentation", url: "https://learn.microsoft.com/en-us/azure/key-vault/" },
  ],
  bank: ["sb-cloud"],
};

export const DEVOPS: StudyTopic = {
  id: "devops",
  short: "Git & CI/CD",
  title: "Git, Jenkins and GitHub Actions",
  jd: "DevOps & CI/CD: Git, Jenkins, GitHub Actions; support CI/CD and automated testing",
  weight: "familiar",
  summary:
    "Every change at a bank goes through version control, review, an automated pipeline and security scans before it reaches production. As an entry-level developer you'll use Git daily, read and fix pipelines, and keep the build green. Be fluent with merge vs rebase and how to undo things, and able to describe a pipeline stage by stage.",
  concepts: [
    concept("Commits, branches and `HEAD`", "A commit is a snapshot of the project plus its parent and message, named by a hash. A branch is a movable pointer to a commit. `HEAD` is the commit you have checked out, usually through a branch."),
    concept("The three areas", "The **working tree** (your files), the **staging area** or index (what the next commit will contain: `git add`), and the **repository** (the commits). `git status` shows what's in each."),
    concept("Merge", "Combines two branches. If `main` hasn't moved, it's a **fast-forward**: the pointer just moves. Otherwise Git creates a **merge commit** with two parents, keeping both histories exactly as they happened."),
    concept("Rebase", "Replays your commits on top of another commit, giving new commits with new hashes and a linear history. Fine for your own unpushed or feature branch; never rebase commits others have based work on. After rebasing a pushed branch, push with `--force-with-lease`."),
    concept("Squash", "Combines several commits into one, usually when merging a pull request, so `main` gets one clean commit per change while the branch keeps its messy history."),
    concept("Undoing things", "`git revert` adds a new commit that undoes an old one: safe on shared branches. `git reset` moves the branch pointer back (`--soft` keeps changes staged, `--mixed` unstaged, `--hard` discards them): local history only. `git restore` discards or unstages file changes."),
    concept("Safety nets", "`git reflog` records every position `HEAD` has been at, so commits 'lost' after a bad reset or rebase can be found. `git stash` parks unfinished work. `git bisect` binary-searches history for the commit that broke something."),
    concept("Pull requests and code review", "A branch proposed for merging, reviewed before it lands. Small, focused PRs with a clear description and tests get faster, better reviews. Branch protection enforces green checks and approvals before merge."),
    concept("Branching strategies", "**GitFlow**: long-lived `develop` and `main`, plus feature, release and hotfix branches, for scheduled releases. **GitHub flow**: short feature branches merged into `main`, which is always deployable. **Trunk-based**: tiny branches merged at least daily, with unfinished work hidden behind feature flags."),
    concept("CI, continuous delivery, continuous deployment", "**Continuous integration**: every push is built and tested automatically. **Continuous delivery**: every green build is releasable, deployed to production by a button. **Continuous deployment**: every green build goes to production automatically. Banks usually stop at delivery, with an approval."),
    concept("Pipeline stages", "Checkout, build, unit tests, static analysis and security scans (SAST such as Fortify, dependency or SCA scans such as BlackDuck), package and publish an artifact or image, deploy to a test environment, integration and end-to-end tests, approval, deploy to production, smoke tests."),
    concept("Jenkins", "A self-hosted automation server: a **controller** schedules jobs onto **agents** that run them. Pipelines live in a `Jenkinsfile` in the repository: **declarative** syntax (structured `pipeline { stages { ... } }`) or **scripted** (free Groovy). Plugins add everything else; credentials are stored and injected by ID."),
    concept("GitHub Actions", "CI/CD built into GitHub. **Workflows** in `.github/workflows/*.yml` run on **events** (`push`, `pull_request`, schedules); they contain **jobs** that run on **runners** (GitHub-hosted or self-hosted), made of **steps** that run commands or reusable **actions**. Environments add approvals and scoped secrets."),
    concept("OIDC federation", "Instead of storing a cloud key as a CI secret, the pipeline gets a short-lived OpenID Connect token from GitHub or Jenkins and exchanges it for temporary cloud credentials (Workload Identity Federation on Google Cloud, federated credentials in Entra ID). Nothing long-lived to leak."),
    concept("Deployment strategies", "**Rolling**: replace instances a few at a time. **Blue-green**: run the new version beside the old, then switch all traffic. **Canary**: send a small share of traffic to the new version and widen it while metrics stay healthy. **Feature flags** separate deploying code from releasing a feature."),
    concept("Infrastructure as code", "Cloud resources declared in files, such as Terraform (which GWE's postings mention), reviewed in pull requests and applied by pipelines. Environments become reproducible, changes are reviewed, and drift is detectable."),
  ],
  parts: [
    {
      id: "devops-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Merge", "Rebase", "Squash merge"],
          ["History", "True history, with merge commits", "Linear, rewritten commits", "One commit per PR on `main`"],
          ["Rewrites commits", "No", "Yes: new hashes", "The PR's commits become one"],
          ["Safe on shared branches", "Yes", "No", "Yes (it happens at merge time)"],
          ["Typical use", "Merging a release or long-lived branch", "Updating your feature branch with `main`", "Merging pull requests"],
        ),
        table(
          ["Command", "Moves the branch", "Changes files", "Safe after pushing"],
          ["`git revert <sha>`", "No: adds a commit", "Undoes that commit's changes", "Yes"],
          ["`git reset --soft HEAD~1`", "Back one commit", "No: changes stay staged", "No"],
          ["`git reset --hard <sha>`", "To `<sha>`", "Discards everything since", "No"],
          ["`git restore <file>`", "No", "Discards uncommitted changes to the file", "Yes"],
        ),
        table(
          ["", "GitFlow", "GitHub flow", "Trunk-based"],
          ["Long-lived branches", "`main` and `develop`", "`main`", "`main` (trunk)"],
          ["Feature branches", "Days to weeks", "Days", "Hours, or none"],
          ["Releases", "Release branches, scheduled", "Deploy `main` after each merge", "Continuously, behind feature flags"],
          ["Fits", "Versioned products, strict release windows", "Web services, small teams", "High-performing CI/CD teams"],
        ),
        table(
          ["", "Jenkins", "GitHub Actions"],
          ["Hosting", "Self-hosted controller and agents", "GitHub-hosted runners, or self-hosted"],
          ["Pipeline file", "`Jenkinsfile` (Groovy DSL)", "`.github/workflows/*.yml`"],
          ["Extensions", "Plugins installed on the server", "Actions from the Marketplace, versioned per workflow"],
          ["Secrets", "Credentials store, `credentials('id')`", "Repository, organisation and environment secrets; OIDC"],
          ["Strengths", "Total control, on-premises reach, mature at banks", "No server to run, tight PR integration, easy matrices"],
          ["Weak spots", "Upgrading and securing the server and plugins", "Minutes cost, and less control on hosted runners"],
        ),
        table(
          ["Strategy", "How", "Rollback", "Cost"],
          ["Rolling", "Replace instances gradually", "Roll forward or back gradually", "Low: no extra capacity"],
          ["Blue-green", "Full new environment, switch traffic at once", "Switch back instantly", "Double capacity during the switch"],
          ["Canary", "A small share of traffic first, then widen", "Send the share back to the old version", "Needs good metrics and traffic splitting"],
        ),
      ],
    },
    {
      id: "devops-files",
      title: "What it looks like",
      blocks: [
        bash(`
git switch -c feature/kyc-retry             # new branch (git checkout -b before Git 2.23)
git add -p                                   # stage changes hunk by hunk, reviewing as you go
git commit -m "Retry KYC checks on 503"
git fetch origin && git rebase origin/main   # replay your commits on the latest main
git push --force-with-lease                  # force-push your rebased branch, safely

git revert a1b2c3d          # undo a pushed commit with a new commit
git reset --soft HEAD~1     # undo the last local commit, keep the changes staged
git restore --staged app.ts # unstage a file
git stash push -m "wip"     # park unfinished work; git stash pop brings it back
git reflog                  # find a commit "lost" after a bad reset or rebase
git cherry-pick a1b2c3d     # copy one commit onto this branch, such as a hotfix
git bisect start            # binary-search history for the commit that broke a test
`, { caption: "Everyday Git, and the recovery commands" }),
        groovy(`
pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('sonar-token')
    }
    stages {
        stage('Build and test') {
            steps {
                sh './mvnw -B verify'
            }
            post {
                always { junit 'target/surefire-reports/*.xml' }
            }
        }
        stage('Security scans') {
            parallel {
                stage('SAST') { steps { sh './scripts/fortify-scan.sh' } }
                stage('Dependencies') { steps { sh './scripts/blackduck-scan.sh' } }
            }
        }
        stage('Deploy to dev') {
            when { branch 'main' }
            steps { sh './scripts/deploy.sh dev' }
        }
        stage('Deploy to production') {
            when { branch 'main' }
            input { message 'Deploy to production?' }
            steps { sh './scripts/deploy.sh prod' }
        }
    }
}
`, { caption: "Jenkinsfile: a declarative pipeline with scans and an approval" }),
        yaml(`
name: ci
on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [24, 26]
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: \${{ matrix.node }}
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
`, { caption: ".github/workflows/ci.yml: lint, type-check and test on every PR" }),
      ],
    },
    {
      id: "devops-before-after",
      title: "Before and after",
      pairs: [
        pair("A stored cloud key in CI to OIDC federation", "GitHub Actions OIDC (2021), Workload Identity Federation", "The workflow proves who it is with a short-lived token GitHub signs; Google Cloud trusts that token only for this repository and branch. There's no key to rotate, and none to leak.", {
          before: yaml(`
- uses: google-github-actions/auth@v2
  with:
    credentials_json: \${{ secrets.GCP_SERVICE_ACCOUNT_KEY }} # a long-lived JSON key
`),
          after: yaml(`
permissions:
  contents: read
  id-token: write # lets the job request an OIDC token

steps:
  - uses: google-github-actions/auth@v2
    with:
      workload_identity_provider: projects/123456/locations/global/workloadIdentityPools/github/providers/my-repo
      service_account: deployer@my-project.iam.gserviceaccount.com
`),
        }),
        pair("A scripted pipeline to a declarative one", "Jenkins Declarative Pipeline (2017)", "Declarative syntax is validated before it runs, has standard sections for agents, environment, `post` actions and `when` conditions, and is readable by people who don't know Groovy.", {
          before: groovy(`
node {
    stage('Build') {
        checkout scm
        sh './mvnw -B verify'
    }
    if (env.BRANCH_NAME == 'main') {
        stage('Deploy') {
            sh './scripts/deploy.sh dev'
        }
    }
}
`),
          after: groovy(`
pipeline {
    agent any
    stages {
        stage('Build') {
            steps { sh './mvnw -B verify' }
        }
        stage('Deploy') {
            when { branch 'main' }
            steps { sh './scripts/deploy.sh dev' }
        }
    }
}
`),
        }),
        pair("`git checkout` for everything to `git switch` and `git restore`", "Git 2.23 (2019)", "`checkout` both switched branches and overwrote files, an easy way to lose work. The newer commands each do one job.", {
          before: bash(`
git checkout -b feature/statements   # create and switch
git checkout main                    # switch
git checkout -- app.ts               # discard changes to a file
git reset HEAD app.ts                # unstage
`),
          after: bash(`
git switch -c feature/statements
git switch main
git restore app.ts
git restore --staged app.ts
`),
        }),
      ],
    },
  ],
  questions: [
    qa("Merge vs rebase?", "Merge joins two histories with a merge commit and rewrites nothing, so it's safe on shared branches. Rebase replays your commits on a new base for a linear history, but rewrites their hashes. I rebase my own feature branch onto `main` before opening a PR, and never rebase a branch others are using."),
    qa("How do you undo a commit that's already been pushed?", "`git revert <sha>`, which adds a new commit reversing it and leaves history intact for everyone else. `reset` plus a force-push rewrites shared history and breaks other people's clones, so I'd only do that on my own branch."),
    qa("How do you resolve a merge conflict?", "Pull the latest target branch, merge or rebase, and open each conflicted file: decide what the combined code should be (not just 'mine' or 'theirs'), remove the markers, run the tests, then `git add` and continue. If the intent is unclear, ask the other author."),
    qa("`git fetch` vs `git pull`?", "`fetch` downloads new commits and updates remote-tracking branches without touching your work. `pull` is `fetch` followed by a merge (or rebase, with `--rebase`) into your current branch. Fetching first lets you see what changed before integrating."),
    qa("What is CI/CD?", "Continuous integration: every change is merged often and verified by an automated build and tests. Continuous delivery: every passing build is deployable, with an approval to release. Continuous deployment: passing builds go to production automatically. Together they make releases small, frequent and low-risk."),
    qa("Describe a CI/CD pipeline you'd set up.", "On a pull request: build, unit tests, lint, type-check, SAST and dependency scans, with branch protection requiring them. On merge to `main`: build the image once, tag it with the commit, push it to a registry, deploy to dev, run integration and smoke tests, then promote the same image to staging and, after approval, production."),
    qa("Jenkins vs GitHub Actions?", "Jenkins is a self-hosted server with plugins and Groovy `Jenkinsfile` pipelines: flexible, common in banks, but you maintain and secure it. GitHub Actions is built into GitHub with YAML workflows and hosted runners: less to operate, tight PR integration. Both can run the same stages."),
    qa("How do you keep secrets out of pipelines?", "Store them in the CI's secret store or a vault and inject them at run time, masked in logs; better still, use OIDC federation so there's no long-lived cloud key at all. Scope secrets to environments, require approval for production, and scan repositories for leaked secrets."),
    qa("GitFlow vs trunk-based development?", "GitFlow uses long-lived `develop` and release branches: predictable for scheduled releases, but merges get big and slow. Trunk-based development merges small changes into `main` at least daily, behind feature flags: needs strong automated tests, and gives the fastest feedback."),
    qa("What makes a good pull request, and a good review?", "A small, single-purpose change with a description of why, how it was tested, and screenshots for UI. As a reviewer: check correctness, tests, security and readability, ask questions instead of commanding, separate blocking issues from nits, and review promptly."),
    qa("Blue-green vs canary deployment?", "Blue-green runs the new version beside the old and switches all traffic at once, with an instant switch back. Canary sends a small percentage of traffic to the new version first and increases it while error rates and latency stay normal: safer, but needs traffic splitting and good metrics."),
    qa("What does `git cherry-pick` do, and when would you use it?", "It applies the changes of a specific commit onto your current branch as a new commit. Typical use: copying a hotfix from `main` to a release branch without merging everything else."),
    qa("What is infrastructure as code?", "Defining cloud resources (networks, databases, Cloud Run services, Key Vaults, IAM) in code such as Terraform, stored in Git, reviewed in pull requests and applied by a pipeline. Environments become reproducible and auditable, and manual drift is detectable."),
    qa("The build is red on `main`. What do you do?", "Treat it as the team's top priority: check whether my change caused it, read the failing step's logs, reproduce it locally, then fix forward quickly or revert the offending commit. Tell the team in the channel, and add a test or check so it can't recur."),
  ],
  news: [
    { text: "GitHub Actions and Jenkins both support OIDC federation to Google Cloud and Azure, so pipelines can deploy without stored cloud keys; it's now the recommended setup.", url: "https://docs.github.com/en/actions/concepts/security/openid-connect" },
  ],
  docs: [
    { label: "Pro Git book", url: "https://git-scm.com/book/en/v2" },
    { label: "Jenkins pipeline syntax", url: "https://www.jenkins.io/doc/book/pipeline/syntax/" },
    { label: "GitHub Actions documentation", url: "https://docs.github.com/en/actions" },
  ],
  bank: ["sb-devops", "sb-testing"],
};

export const CONTAINERS: StudyTopic = {
  id: "containers",
  short: "Docker & Kubernetes",
  title: "Docker and Kubernetes",
  jd: "Containerization: Docker, Kubernetes (asset)",
  weight: "asset",
  summary:
    "Containers are how GWE's services ship: Cloud Run runs container images, and Kubernetes runs them at scale elsewhere. The posting lists this as an asset, so aim to explain what a container is, write a sensible Dockerfile, and name the main Kubernetes objects and what a probe is for.",
  concepts: [
    concept("Containers vs virtual machines", "A VM virtualises hardware and runs a full guest operating system. A container is a process isolated by the host kernel's **namespaces** (what it can see) and **cgroups** (how much CPU and memory it can use), so it starts in milliseconds and weighs megabytes."),
    concept("Image, layer, container, registry", "An **image** is a read-only stack of **layers**, one per Dockerfile instruction. A **container** is a running instance of an image with a thin writable layer on top. A **registry** stores images: Artifact Registry, Azure Container Registry, Docker Hub."),
    concept("Dockerfile instructions", "`FROM` (base image), `WORKDIR`, `COPY`, `RUN` (executes at build time and adds a layer), `ENV`, `EXPOSE` (documents the port), `USER`, and `CMD` or `ENTRYPOINT` (what runs when the container starts)."),
    concept("Layer caching", "Docker reuses a cached layer while nothing it depends on has changed. Copy the dependency manifests and install first, then copy the source, so a code change doesn't reinstall every dependency."),
    concept("Multi-stage builds", "Build in one stage with the full toolchain (JDK, npm dev dependencies), then copy only the artifact into a small runtime image. The image ships faster and has fewer packages for attackers and scanners to find."),
    concept("Hardening images", "Pin base image versions instead of `latest`, run as a non-root `USER`, use slim or distroless bases, add a `.dockerignore`, keep secrets out of layers, and scan images in CI."),
    concept("Volumes", "Container file systems are thrown away with the container. A **volume** (managed by Docker) or a bind mount (a host folder) keeps data beyond the container's life. In Kubernetes, PersistentVolumes do this."),
    concept("Docker Compose", "A YAML file that starts several containers together, such as the API, PostgreSQL and Kafka, with their networks and volumes: ideal for local development and integration tests."),
    concept("Kubernetes control plane", "The **API server** (every change goes through it), **etcd** (the cluster's state store), the **scheduler** (places pods on nodes) and **controllers** (keep reconciling actual state towards the desired state you declared)."),
    concept("Nodes", "Worker machines running the **kubelet** (starts pods and reports their status), **kube-proxy** (implements Service networking) and a container runtime such as containerd."),
    concept("Pods", "The smallest deployable unit: one or more containers sharing a network namespace (one IP) and volumes. Pods are disposable; you rarely create them directly."),
    concept("Deployments and ReplicaSets", "A Deployment declares the desired pods (image, replicas, update strategy); it manages ReplicaSets, which keep that many pods running, and performs rolling updates and rollbacks."),
    concept("Services and Ingress", "A **Service** gives a changing set of pods one stable name and IP and load-balances across them: `ClusterIP` (internal), `NodePort`, `LoadBalancer` (external). **Ingress**, or its successor the **Gateway API**, routes HTTP traffic to Services by host and path."),
    concept("ConfigMaps and Secrets", "Configuration injected into pods as environment variables or files. Secrets are only base64-encoded by default: enable encryption at rest, restrict access with RBAC, or sync them from a real vault."),
    concept("Probes", "**Readiness**: should this pod receive traffic now? **Liveness**: is it stuck, so it should be restarted? **Startup**: give slow starters time before liveness checks begin. Spring Boot Actuator provides matching endpoints."),
    concept("Requests, limits and autoscaling", "**Requests** reserve CPU and memory for scheduling; **limits** cap them, and exceeding the memory limit kills the container (`OOMKilled`). The HorizontalPodAutoscaler adds or removes pods based on metrics such as CPU."),
  ],
  parts: [
    {
      id: "containers-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Virtual machine", "Container"],
          ["Isolates", "Hardware, with a full guest OS", "A process, sharing the host kernel"],
          ["Size", "Gigabytes", "Megabytes"],
          ["Starts in", "Minutes", "Seconds or less"],
          ["Isolation strength", "Strong", "Weaker: the kernel is shared"],
          ["Packaging", "OS images", "Application plus dependencies"],
        ),
        table(
          ["Instruction", "When it runs", "Use it for"],
          ["`RUN`", "At build time, creating a layer", "Installing packages, compiling"],
          ["`CMD`", "At start, if no command is given", "The default command, easily overridden"],
          ["`ENTRYPOINT`", "At start, always", "The fixed executable; `CMD` supplies default arguments"],
        ),
        table(
          ["Object", "What it is"],
          ["Pod", "One or more containers scheduled together"],
          ["Deployment", "Desired state for stateless pods: replicas, image, rolling updates"],
          ["StatefulSet", "Pods with stable names and storage: databases, Kafka brokers"],
          ["Job / CronJob", "Pods that run to completion, once or on a schedule"],
          ["Service", "A stable name and IP load-balancing across matching pods"],
          ["Ingress / Gateway", "HTTP routing from outside into Services"],
          ["ConfigMap / Secret", "Configuration and sensitive values for pods"],
          ["HorizontalPodAutoscaler", "Scales a Deployment's replicas on metrics"],
          ["Namespace", "A scope for names, quotas and permissions"],
        ),
      ],
    },
    {
      id: "containers-files",
      title: "What it looks like",
      blocks: [
        dockerfile(`
FROM eclipse-temurin:21-jdk AS build
WORKDIR /src
COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN ./mvnw -B dependency:go-offline
COPY src src
RUN ./mvnw -B package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /src/target/*.jar app.jar
USER 1000
EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-jar", "app.jar"]
`, { caption: "A Spring Boot service: dependencies cached, JRE-only runtime, non-root" }),
        yaml(`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: onboarding-api
spec:
  replicas: 3
  selector:
    matchLabels: { app: onboarding-api }
  strategy:
    rollingUpdate: { maxUnavailable: 0, maxSurge: 1 }
  template:
    metadata:
      labels: { app: onboarding-api }
    spec:
      containers:
        - name: api
          image: northamerica-northeast2-docker.pkg.dev/my-project/apps/onboarding-api:1.4.2
          ports: [{ containerPort: 8080 }]
          env:
            - name: DB_PASSWORD
              valueFrom: { secretKeyRef: { name: onboarding-db, key: password } }
          resources:
            requests: { cpu: 250m, memory: 512Mi }
            limits: { memory: 512Mi }
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8080 }
          livenessProbe:
            httpGet: { path: /actuator/health/liveness, port: 8080 }
---
apiVersion: v1
kind: Service
metadata:
  name: onboarding-api
spec:
  selector: { app: onboarding-api }
  ports: [{ port: 80, targetPort: 8080 }]
`, { caption: "A Deployment with probes and resources, and the Service in front of it" }),
        trap("A liveness probe that checks the database restarts every pod when the database blips, turning one outage into two. Liveness checks the process itself; readiness can check dependencies."),
      ],
    },
    {
      id: "containers-before-after",
      title: "Before and after",
      pairs: [
        pair("A naive Dockerfile to a cached, multi-stage, non-root one", "Multi-stage builds (Docker 17.05)", "The first version reinstalls dependencies on every code change, ships dev dependencies and build tools, runs as root, and uses a shell-form `CMD`, so `SIGTERM` goes to the shell and graceful shutdown never happens.", {
          before: dockerfile(`
FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
CMD npm start
`),
          after: dockerfile(`
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 8080
CMD ["node", "dist/server.js"]
`),
        }),
      ],
    },
  ],
  questions: [
    qa("Container vs virtual machine?", "A VM runs a whole guest OS on virtualised hardware: strong isolation, gigabytes, minutes to boot. A container is an isolated process sharing the host kernel, with namespaces and cgroups: megabytes, starts in a second, so you can run many and replace them freely."),
    qa("Image vs container?", "An image is the read-only template: layers of files plus metadata such as the start command. A container is a running instance of it, with its own writable layer that disappears when the container is removed. One image can run as many containers."),
    qa("How do you make an image smaller and faster to build?", "Multi-stage builds so only the runtime artifact ships; a slim or distroless base; copy dependency manifests and install before copying source, for cache reuse; a `.dockerignore` for `node_modules`, `.git` and build output; and combine clean-up into the same `RUN` that created the files."),
    qa("`CMD` vs `ENTRYPOINT`?", "`ENTRYPOINT` sets the executable that always runs; `CMD` provides default arguments, or the default command if there's no entrypoint, and is replaced by arguments to `docker run`. Use the exec (JSON array) form so the process receives signals directly."),
    qa("What is a pod?", "Kubernetes' smallest unit: one or more containers that share an IP, ports and volumes and are always scheduled together, such as an app and a logging sidecar. Pods are disposable and replaced, not repaired, which is why Deployments manage them."),
    qa("Deployment vs pod vs Service?", "A pod runs containers. A Deployment declares how many pods of which image should exist, and replaces or updates them. A Service gives that changing set of pods one stable address and load-balances across them."),
    qa("Liveness vs readiness probes?", "Readiness decides whether a pod gets traffic: fail it while starting, or when a dependency is down. Liveness decides whether the container is restarted: fail it only when the process is wedged. Mixing them up causes restart storms."),
    qa("Are Kubernetes Secrets secure?", "Only as secure as you make them: by default they're base64-encoded, not encrypted, in etcd. Enable encryption at rest, restrict access with RBAC, avoid printing them, or sync from Key Vault or Secret Manager with an external secrets operator or CSI driver."),
    qa("How does a rolling update work?", "The Deployment creates a new ReplicaSet and shifts pods over gradually: start a new pod, wait until it's ready, remove an old one, within `maxSurge` and `maxUnavailable`. `kubectl rollout undo` goes back to the previous ReplicaSet."),
    qa("Requests vs limits?", "Requests are what the scheduler reserves for the container when placing it; limits are the ceiling. Exceeding the CPU limit throttles the container; exceeding the memory limit kills it with `OOMKilled`. Set memory request equal to limit for predictability."),
    qa("A pod is in `CrashLoopBackOff`. How do you debug it?", "`kubectl describe pod` for events (image pulls, probe failures, `OOMKilled`), then `kubectl logs <pod> --previous` for the crashed container's output. Common causes: a bad config or missing secret, a failing liveness probe, too little memory, or the app exiting at startup."),
    qa("Docker Compose vs Kubernetes?", "Compose starts a few containers together on one machine from a simple YAML file: ideal for local development and tests. Kubernetes orchestrates containers across a cluster with self-healing, scaling, rolling updates and service discovery: for production."),
    qa("How does Cloud Run relate to containers and Kubernetes?", "Cloud Run runs your container image with no cluster to manage: you give it an image and it handles scaling, TLS and routing. It implements the Knative serving model that runs on Kubernetes, so a Cloud Run service can move to GKE with Knative, and vice versa."),
  ],
  news: [
    { text: "Kubernetes v1.36 (April 2026) is the current minor release line; Kubernetes ships three minor versions a year.", url: "https://kubernetes.io/blog/2026/04/22/kubernetes-v1-36-release/" },
    { text: "Maintenance of the community Ingress NGINX controller ended in March 2026; new clusters should route with the Gateway API instead.", url: "https://kubernetes.io/blog/2025/11/11/ingress-nginx-retirement/" },
  ],
  docs: [
    { label: "Docker documentation", url: "https://docs.docker.com/" },
    { label: "Dockerfile best practices", url: "https://docs.docker.com/build/building/best-practices/" },
    { label: "Kubernetes documentation", url: "https://kubernetes.io/docs/home/" },
  ],
  bank: ["sb-devops", "sb-cloud"],
};
