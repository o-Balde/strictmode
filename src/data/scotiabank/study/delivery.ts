import { concept, java, js, list, output, p, pair, qa, steps, table, trap } from "./authoring";
import type { StudyTopic } from "./types";

export const AGILE: StudyTopic = {
  id: "agile",
  short: "Agile & SDLC",
  title: "Agile, the SDLC, testing and code review",
  jd: "Agile methodologies and SDLC; code reviews and coding standards; work in cross-functional teams",
  weight: "familiar",
  summary:
    "Questions here sound simple and are really about how you work: what happens in a sprint, what 'done' means, how you test, how you give and take code review, and what you do when you're stuck or something breaks in production. Answer with the vocabulary, then with a short example of your own.",
  concepts: [
    concept("The SDLC", "The software development life cycle: requirements, design, implementation, testing, deployment, then operation and maintenance. Waterfall runs the phases once, in order; Agile runs all of them in small loops, every sprint or every change."),
    concept("The Agile Manifesto", "Four values from 2001: **individuals and interactions** over processes and tools, **working software** over comprehensive documentation, **customer collaboration** over contract negotiation, **responding to change** over following a plan. The right side still matters; the left matters more."),
    concept("Scrum", "A framework for delivering in fixed-length **sprints** of one month or less, usually two weeks. Three accountabilities, five events, three artifacts, each artifact with a commitment. It's deliberately incomplete: teams add their own practices."),
    concept("Scrum accountabilities", "The **Product Owner** maximises value and orders the Product Backlog. The **Scrum Master** makes the team effective: coaching, removing impediments, protecting the process. The **Developers** (everyone building the increment, testers included) plan and do the work."),
    concept("Scrum events", "**Sprint Planning**: why, what and how for the sprint. **Daily Scrum**: 15 minutes for Developers to inspect progress toward the Sprint Goal and adapt. **Sprint Review**: inspect the increment with stakeholders. **Retrospective**: improve how the team works. The **Sprint** contains them all."),
    concept("Artifacts and commitments", "**Product Backlog**, committed to a **Product Goal**. **Sprint Backlog**, committed to a **Sprint Goal**. The **Increment**, committed to the **Definition of Done**. The commitments say what each artifact is for."),
    concept("Kanban", "A flow method: visualise the work on a board, **limit work in progress** per column, pull new work only when there's capacity, and measure cycle time and throughput. No sprints or prescribed roles; common for support and platform teams."),
    concept("User stories", "A small piece of value from the user's view: 'As a new client, I want to upload my ID from my phone, so that I can open an account without visiting a branch.' Good stories are INVEST: independent, negotiable, valuable, estimable, small, testable."),
    concept("Acceptance criteria", "The conditions a specific story must meet to be accepted, often written as **Given** (context), **When** (action), **Then** (outcome). They become test cases, and settle arguments before the code is written."),
    concept("Definition of Done", "The team's shared quality bar for every item: code reviewed, tests written and passing, security scans clean, documentation updated, deployed to a test environment, acceptance criteria met. If it isn't done, it doesn't go in the increment."),
    concept("Estimation", "Story points are relative estimates of effort, complexity and uncertainty, often found with planning poker. Velocity, points completed per sprint, helps forecast; it isn't a productivity score and isn't comparable between teams."),
    concept("Backlog refinement", "An ongoing activity in which the team and Product Owner split, clarify and estimate upcoming items, so sprint planning starts from items that are ready."),
    concept("The testing pyramid", "Many fast **unit** tests at the bottom, fewer **integration** tests (real database, real HTTP), and few slow **end-to-end** tests through the UI at the top. Between services, **contract tests** check that a provider still meets what its consumers expect."),
    concept("Test-driven development", "Red, green, refactor: write a failing test for the next behaviour, write the simplest code that passes, then clean it up with the tests as a safety net. It produces testable design and a suite you trust."),
    concept("Code review", "Reviewers check correctness, tests, security, readability and fit with the codebase, not personal style, which linters and formatters settle automatically. Keep pull requests small, explain the why, respond to every comment, and separate blocking issues from suggestions."),
    concept("Coding standards", "Shared conventions for naming, structure, error handling, logging and tests, enforced by tools (ESLint, Prettier, Checkstyle, Sonar) in the pipeline, so reviews focus on design and behaviour."),
    concept("Technical debt", "The future cost of shortcuts taken now: missing tests, duplicated code, outdated dependencies. Make it visible as backlog items, pay it down continuously alongside features, and don't let it pile up silently."),
    concept("Incidents and postmortems", "In an incident: restore service first (roll back, fail over), communicate status, then find the root cause. Afterwards a **blameless postmortem** records the timeline, causes and follow-up actions, and asks what about the system let it happen, not who."),
    concept("Asking for help", "Time-box the investigation, then bring a senior engineer context: what you're trying to do, what you've tried and seen, your current hypothesis, and the specific question. That makes help fast and shows you've done the groundwork."),
  ],
  parts: [
    {
      id: "agile-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Waterfall", "Scrum", "Kanban"],
          ["Cadence", "One pass through the phases", "Fixed sprints, usually two weeks", "Continuous flow"],
          ["Change", "Expensive once the phase is done", "Welcome between sprints", "Welcome any time"],
          ["Roles", "Project manager, phase teams", "Product Owner, Scrum Master, Developers", "None prescribed"],
          ["Planning", "Up front, in detail", "Each sprint, against a goal", "Just in time, by pulling work"],
          ["Key measure", "On time, on budget", "Sprint Goal met, velocity", "Cycle time, throughput"],
          ["Fits", "Fixed, well-understood scope; heavy compliance gates", "Product development with evolving needs", "Support, operations, unpredictable work"],
        ),
        table(
          ["Event", "Time-box for a one-month sprint (shorter for shorter sprints)", "Purpose"],
          ["Sprint Planning", "Up to 8 hours", "Why this sprint matters, what can be done, how"],
          ["Daily Scrum", "15 minutes", "Developers inspect progress toward the Sprint Goal and adjust the plan"],
          ["Sprint Review", "Up to 4 hours", "Show the increment to stakeholders and adapt the backlog"],
          ["Sprint Retrospective", "Up to 3 hours", "Decide how to improve the way the team works"],
        ),
        table(
          ["", "Definition of Done", "Acceptance criteria"],
          ["Applies to", "Every item", "One specific story"],
          ["Owned by", "The whole team (and organisation standards)", "The Product Owner, with the team"],
          ["Example", "Reviewed, tested, scanned, deployed to test, documented", "Given an expired ID, when I upload it, then I see an error naming the expiry date"],
        ),
        table(
          ["Test type", "Checks", "Speed", "How many"],
          ["Unit", "One function or class, dependencies faked", "Milliseconds", "Many"],
          ["Integration", "Code with a real database, queue or HTTP layer", "Seconds", "Some"],
          ["Contract", "A provider still honours what its consumers rely on", "Seconds", "One per consumer-provider pair"],
          ["End-to-end", "A user journey through the deployed system", "Minutes", "A few critical paths"],
          ["Non-functional", "Performance, security scans, accessibility", "Varies", "In the pipeline and before release"],
        ),
      ],
    },
    {
      id: "agile-examples",
      title: "What it looks like",
      blocks: [
        p("**Story:** As a new wealth client, I want to upload my government ID from my phone, so that I can open an account without visiting a branch."),
        list(
          "**Given** a valid, unexpired driver's licence, **when** I upload a photo of both sides, **then** my identity check starts and I see 'Verifying your ID'.",
          "**Given** an ID that expired last month, **when** I upload it, **then** I see 'This ID expired on 14 October 2026' and can upload another.",
          "**Given** a blurry photo, **when** I upload it, **then** I'm asked to retake it, and nothing is sent for verification.",
          "**Given** any upload, **then** the image is stored encrypted, and the audit log records who uploaded it and when.",
        ),
        java(`
@ExtendWith(MockitoExtension.class)
class ClientServiceTest {
    @Mock ClientRepository clients;
    @InjectMocks ClientService service;

    @Test
    void rejectsADuplicateEmail() {
        when(clients.existsByEmail("ana@example.com")).thenReturn(true);

        assertThrows(DuplicateClientException.class,
                () -> service.create(new NewClientRequest("Ana", "ana@example.com")));
        verify(clients, never()).save(any());
    }
}
`, { caption: "A unit test with JUnit 5 and Mockito: arrange, act, assert" }),
        steps(
          "**Goal**: 'I'm adding retry to the KYC client so a 503 doesn't fail the application.'",
          "**What I tried**: 'I wrapped the call with `@Retryable`, but the logs still show one attempt.'",
          "**What I think**: 'The method is called from inside the same class, so the proxy is bypassed.'",
          "**The question**: 'Should I move it to its own bean, or is there a pattern the team prefers?'",
        ),
      ],
    },
  ],
  questions: [
    qa("What is Agile?", "A way of building software in small, frequent increments with constant feedback, based on the Agile Manifesto: people and collaboration, working software, customer collaboration, and responding to change. Scrum and Kanban are the common frameworks for putting it into practice."),
    qa("What are the Scrum roles?", "The Product Owner, who owns and orders the backlog to maximise value; the Scrum Master, who helps the team work effectively and removes impediments; and the Developers, everyone who builds the increment. Scrum calls them accountabilities."),
    qa("Walk me through a sprint.", "Sprint Planning sets a Sprint Goal and picks backlog items; each day a 15-minute Daily Scrum checks progress toward the goal; the team builds, reviews and tests to the Definition of Done; the Sprint Review shows the increment to stakeholders; the Retrospective picks one or two improvements. Refinement happens along the way."),
    qa("Scrum vs Kanban?", "Scrum works in fixed sprints with set roles and events and commits to a goal per sprint. Kanban is continuous flow: a board, work-in-progress limits, and work pulled as capacity frees up, measured by cycle time. Many teams mix them."),
    qa("What makes a good user story and good acceptance criteria?", "A story says who wants what and why, is small enough for a sprint, and is testable (INVEST). Acceptance criteria are concrete, testable conditions, often Given/When/Then, covering the main path, edge cases and errors."),
    qa("Definition of Done vs acceptance criteria?", "Acceptance criteria are specific to one story: what it must do. The Definition of Done applies to every item: the quality bar of review, tests, scans, documentation and deployment. A story is complete only when it meets both."),
    qa("What are story points?", "A relative estimate of size, combining effort, complexity and uncertainty, compared with stories the team has already done. Over a few sprints, velocity helps forecast. They aren't hours, and they shouldn't be used to compare teams or people."),
    qa("What happens if the team can't finish the sprint's work?", "Talk about it early, at the Daily Scrum, not on the last day. The team and Product Owner renegotiate scope while protecting the Sprint Goal; unfinished items go back to the backlog, not into the increment half-done; and the retrospective looks at why: estimates, dependencies, interruptions."),
    qa("How do you approach testing your code?", "Unit tests for logic and edge cases as I write it, ideally test-first for tricky rules; integration tests for repositories and HTTP endpoints against real dependencies with Testcontainers; a few end-to-end tests for critical journeys; and everything running in CI so a red build blocks the merge."),
    qa("Unit vs integration vs end-to-end tests?", "Unit tests check one piece in isolation with fakes: fast and precise. Integration tests check pieces working together with real infrastructure: slower, catch wiring and query bugs. End-to-end tests drive the whole deployed system like a user: most realistic, slowest and most brittle. Hence the pyramid."),
    qa("How do you give and receive code review feedback?", "Giving: be specific, explain why, ask questions rather than issue orders, separate blocking issues from suggestions, and acknowledge what's good. Receiving: assume good intent, ask when something's unclear, fix or discuss every comment, and treat it as learning, especially from senior engineers."),
    qa("What would you do if you disagreed with a senior engineer's review?", "Make sure I understand their reasoning first, then explain mine with evidence: a test, a benchmark, documentation. If we still disagree, agree on a way to decide (the team's conventions, a tech lead, a quick prototype), and then commit to the decision."),
    qa("What is technical debt, and how do you manage it?", "The extra future cost caused by shortcuts, missing tests or outdated designs. Track it visibly in the backlog, explain its cost in delivery terms, pay it down continuously (some capacity each sprint, and leave code better than you found it), and avoid taking it on silently."),
    qa("A bug is reported in production. What do you do?", "Assess the impact and tell the right people; if it's serious, restore service first by rolling back or turning off a feature flag. Then reproduce it with logs, traces and the correlation ID, write a failing test, fix it, and release through the normal pipeline. Finish with a blameless postmortem and follow-ups."),
    qa("How do you handle being stuck on a problem?", "Time-box it, perhaps 30 to 60 minutes: reproduce it, read the error and the docs, isolate with a minimal example, check the logs. Then ask, bringing context: the goal, what I tried, my hypothesis and a specific question. Afterwards, write down the answer for the next person."),
    qa("What are the phases of the SDLC?", "Requirements, design, implementation, testing, deployment, and operations and maintenance. In an Agile team with CI/CD, all of them happen in every small change: a story is refined, designed, coded with tests, reviewed, deployed through the pipeline and monitored."),
  ],
  news: [
    { text: "The official Scrum Guide is still the 2020 edition by Ken Schwaber and Jeff Sutherland; a 2025 community 'Scrum Guide Expansion Pack' adds guidance without replacing it.", url: "https://scrumguides.org/scrum-guide.html" },
  ],
  docs: [
    { label: "The Agile Manifesto", url: "https://agilemanifesto.org/" },
    { label: "The Scrum Guide (2020)", url: "https://scrumguides.org/scrum-guide.html" },
    { label: "The Practical Test Pyramid (Martin Fowler)", url: "https://martinfowler.com/articles/practical-test-pyramid.html" },
  ],
  bank: ["sb-agile", "sb-testing", "sb-behavioral"],
};

export const PROBLEM_SOLVING: StudyTopic = {
  id: "problem-solving",
  short: "Problem-solving",
  title: "Problem-solving and the coding test",
  jd: "Strong problem-solving skills",
  weight: "core",
  summary:
    "Candidates report a Codility test with easy-to-medium problems, scored on correctness and performance by hidden tests, plus live problems in the technical round. Knowing a handful of patterns and their complexity, and a repeatable way to approach an unfamiliar problem, covers most of it.",
  concepts: [
    concept("Big-O notation", "How time or memory grows with the input size `n`, ignoring constants: O(1) constant, O(log n) halving, O(n) one pass, O(n log n) sorting, O(n²) nested loops. Codility's performance tests use inputs large enough that O(n²) times out where O(n) passes."),
    concept("The approach", "Restate the problem, ask about input sizes and edge cases, work a small example by hand, state a brute-force solution and its cost, then improve it, code it, and test it with normal, edge and large cases. Talk through each step out loud."),
    concept("Hash maps and sets", "O(1) average lookups. The go-to for counting, de-duplicating, 'have I seen this?', and pairing values (two-sum). They trade memory for speed."),
    concept("Two pointers", "Two indexes moving through an array, often from both ends of a sorted array, or one fast and one slow. Solves pair sums, palindromes, merging and in-place removal in O(n) with O(1) extra space."),
    concept("Sliding window", "A range `[left, right]` that grows and shrinks over an array or string, keeping a running sum or count. Solves 'longest or shortest subarray or substring with a condition' in O(n) instead of checking every range."),
    concept("Stacks and queues", "A **stack** is last in, first out: matching brackets, undo, evaluating expressions, depth-first search. A **queue** is first in, first out: breadth-first search, scheduling. In JavaScript an array works as a stack; in Java, use `ArrayDeque`."),
    concept("Breadth-first and depth-first search", "BFS explores level by level with a queue and finds shortest paths in unweighted graphs and grids. DFS goes deep first with recursion or a stack: connected components (counting islands), cycle detection, exploring every path."),
    concept("Binary search", "On sorted data, halve the search range each step: O(log n). Also works 'on the answer', when you can test whether a value is feasible and feasibility is monotonic. Watch the loop condition and off-by-one errors."),
    concept("Sorting", "General-purpose sorts are O(n log n). Sorting first often turns a hard problem into an easy one: intervals, closest pairs, grouping. JavaScript's default `sort` compares strings, so pass a comparator for numbers."),
    concept("Prefix sums", "Precompute running totals so the sum of any range is `prefix[j] - prefix[i]` in O(1). Common in Codility problems about ranges and passing cars."),
    concept("Recursion and dynamic programming", "Recursion solves a problem through smaller copies of itself; dynamic programming stores the answers to overlapping subproblems (memoisation or a table) so each is solved once: Fibonacci, climbing stairs, coin change."),
    concept("Edge cases", "Empty input, a single element, all equal values, negative numbers, zero, duplicates, very large values (integer overflow in Java), unsorted input, and the maximum input size. Hidden tests are mostly these."),
  ],
  parts: [
    {
      id: "problem-solving-patterns",
      title: "Signals and patterns",
      blocks: [
        table(
          ["If the problem says...", "Reach for", "Typical cost"],
          ["'Find a pair', 'have we seen this', 'count occurrences'", "Hash map or set", "O(n) time, O(n) space"],
          ["Sorted array, or 'pair that sums to'", "Two pointers, or binary search", "O(n) or O(log n)"],
          ["'Longest or shortest subarray or substring such that...'", "Sliding window", "O(n)"],
          ["Matching brackets, nesting, 'most recent'", "Stack", "O(n)"],
          ["Grid or graph, 'shortest number of steps'", "BFS with a queue", "O(cells + edges)"],
          ["'Count the islands or groups'", "DFS or BFS flood fill", "O(cells)"],
          ["Overlapping ranges, meetings", "Sort by start, then sweep", "O(n log n)"],
          ["Sums of many ranges", "Prefix sums", "O(n) setup, O(1) per query"],
          ["'How many ways', 'minimum cost', overlapping subproblems", "Dynamic programming", "Varies; often O(n) or O(n·k)"],
        ),
        table(
          ["Operation", "Array / `ArrayList`", "Hash map / set", "Balanced tree (`TreeMap`)"],
          ["Access by index", "O(1)", "n/a", "n/a"],
          ["Search by value or key", "O(n); O(log n) if sorted", "O(1) average", "O(log n)"],
          ["Insert or delete", "O(n) in the middle, O(1) at the end", "O(1) average", "O(log n)"],
          ["Ordered iteration", "As stored", "No order (`LinkedHashMap`: insertion)", "Sorted"],
        ),
      ],
    },
    {
      id: "problem-solving-before-after",
      title: "Before and after",
      pairs: [
        pair("Nested loops to one pass with a hash map", "Time–space trade-off", "Checking every pair is O(n²) and times out on large inputs. Remembering what you've seen makes it O(n), for O(n) memory.", {
          before: js(`
function twoSum(numbers, target) {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === target) return [i, j];
    }
  }
  return null;
}
`),
          after: js(`
function twoSum(numbers, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < numbers.length; i++) {
    const partner = seen.get(target - numbers[i]);
    if (partner !== undefined) return [partner, i];
    seen.set(numbers[i], i);
  }
  return null;
}
`),
        }),
      ],
    },
    {
      id: "problem-solving-run",
      title: "Patterns, run",
      intro: "Each one runs when this page is built, and its output is checked.",
      blocks: [
        js(`
function maxWindowSum(values, k) {
  if (values.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += values[i];
  let best = sum;
  for (let right = k; right < values.length; right++) {
    sum += values[right] - values[right - k]; // slide: add the new, drop the old
    best = Math.max(best, sum);
  }
  return best;
}
console.log(maxWindowSum([120, -40, 300, 80, -10, 50], 3), maxWindowSum([5], 3));
`, { caption: "Sliding window: the best total over any 3 consecutive days, in O(n)" }),
        output(`
380 null
`),
        js(`
function firstUnique(text) {
  const counts = new Map();
  for (const char of text) counts.set(char, (counts.get(char) ?? 0) + 1);
  for (const char of text) if (counts.get(char) === 1) return char;
  return null;
}
console.log(firstUnique("scotiabank"), firstUnique("aabb"));
`, { caption: "Counting with a map: the first character that appears once" }),
        output(`
s null
`),
        js(`
// the first index whose value is >= target, in a sorted array
function lowerBound(sorted, target) {
  let low = 0;
  let high = sorted.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (sorted[mid] < target) low = mid + 1;
    else high = mid;
  }
  return low;
}
const limits = [500, 1000, 2500, 10000];
console.log(lowerBound(limits, 2500), lowerBound(limits, 2600), lowerBound(limits, 50000));
`, { caption: "Binary search: O(log n), with no off-by-one" }),
        output(`
2 3 4
`),
        trap("`[10, 9, 1].sort()` gives `[1, 10, 9]`: the default sort compares strings. Use `sort((a, b) => a - b)`, or `toSorted` to leave the original alone."),
      ],
    },
  ],
  questions: [
    qa("How do you approach a problem you haven't seen before?", "Restate it and ask about input size, ranges and edge cases; work through a small example by hand; describe a brute-force solution and its complexity; look for the pattern that removes the repeated work (a map, two pointers, sorting); then code it cleanly and test it with edge cases, narrating as I go."),
    qa("What's the time complexity of a hash map lookup?", "O(1) on average, because the key's hash points straight at a bucket. The worst case is O(n) when many keys collide; Java's `HashMap` turns long buckets into trees, so its worst case is O(log n)."),
    qa("Array vs linked list?", "Arrays give O(1) access by index and are cache-friendly, but inserting in the middle shifts elements: O(n). Linked lists insert and remove in O(1) once you hold the node, but access is O(n). In practice arrays (`ArrayList`) win almost always."),
    qa("Stack vs queue?", "A stack is last in, first out (`push`, `pop`): bracket matching, undo, DFS. A queue is first in, first out (enqueue, dequeue): BFS, task processing. In Java, `ArrayDeque` serves as both."),
    qa("BFS vs DFS?", "BFS visits nodes level by level with a queue, so it finds the shortest path in an unweighted graph. DFS follows one path as deep as it goes, with recursion or a stack, and suits connectivity, cycle detection and exhaustive search. Both are O(nodes + edges)."),
    qa("When does recursion become a problem?", "Deep recursion overflows the call stack (a `StackOverflowError` in Java, `RangeError` in JavaScript) on large inputs such as a 100,000-node chain, and naive recursion can repeat work exponentially. Convert to iteration with an explicit stack, or memoise."),
    qa("What's the best complexity for sorting?", "O(n log n) for comparison sorts in general: merge sort, heap sort, and Timsort, which Java (for objects) and JavaScript engines use. Counting or radix sort can beat it for small integer ranges."),
    qa("What does binary search require?", "Data sorted by the key you search on (or a monotonic yes/no condition), and random access. Each step halves the range, so a million items need about 20 comparisons."),
    qa("When would you use dynamic programming?", "When a problem breaks into subproblems that overlap, so plain recursion recomputes them, and the best answer is built from the best answers to subproblems: counting ways, minimum cost, longest sequence. Store each subproblem's answer once."),
    qa("How do Codility tests score you?", "Hidden tests check correctness, including edge cases, and performance on large inputs; the report shows both. So handle empty and extreme inputs, aim for the expected complexity (often O(n) or O(n log n)), and test your own edge cases before submitting."),
    qa("How do you test your solution in an interview?", "Walk through a normal example line by line, then edge cases: empty, one element, duplicates, negatives, the largest values. Say what output you expect before running it. If something fails, explain the bug before fixing it."),
    qa("What's a time–space trade-off?", "Using more memory to save time, or the reverse: a hash map makes two-sum O(n) time but O(n) space instead of O(n²) time and O(1) space; caching and precomputed prefix sums are the same idea. Say which constraint matters for the problem."),
  ],
  news: [],
  docs: [
    { label: "Codility lessons", url: "https://app.codility.com/programmers/lessons/" },
    { label: "Big-O cheat sheet", url: "https://www.bigocheatsheet.com/" },
  ],
  bank: ["sb-coding", "sb-builds"],
};
