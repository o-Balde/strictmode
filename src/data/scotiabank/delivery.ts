import { java, list, p, say, steps, table, trap, tsx } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_TESTING: PrepSection = {
  id: "sb-testing",
  track: "delivery",
  title: "Testing",
  blurb:
    "'Hands-on development and testing on all project assignments' and 'automated testing' are both in the posting. Scotiabank postings name Jest, React Testing Library, JUnit and Mockito. Know what you would test, at which level, and why.",
  questions: [
    {
      id: "sb-test-pyramid",
      question: "What is the testing pyramid? What would you test in an onboarding form?",
      level: "junior",
      short:
        "Many fast **unit** tests at the bottom: validation rules, reducers, pure functions, service logic. Fewer **integration** tests in the middle: a component with its hooks, a Spring controller with MockMvc, a repository against a real Postgres in Testcontainers. A handful of **end-to-end** tests at the top for the critical journeys, in Playwright or Cypress. The higher the level, the more confidence and the more cost, slowness and flakiness.",
      body: [
        table(
          ["Level", "Onboarding example", "Tools"],
          ["Unit", "SIN checksum, age eligibility per account type, the wizard reducer", "Jest/Vitest, JUnit 5"],
          ["Component", "The employment step shows an error and blocks Next until it is fixed", "React Testing Library"],
          ["API / integration", "POST /applications with a missing field → 400 problem+json", "MockMvc, Testcontainers, supertest"],
          ["Contract", "The BFF and the application service agree on the schema", "Pact, OpenAPI checks"],
          ["E2E", "A client completes a TFSA application from start to finish", "Playwright / Cypress"],
          ["Non-functional", "Accessibility, load, security", "axe, k6/JMeter, DAST"],
        ),
      ],
    },
    {
      id: "sb-test-rtl",
      question: "Write a React Testing Library test for a form validation rule.",
      level: "junior",
      short:
        "Test behaviour the way a user experiences it: find elements by role and label, type and click with `user-event`, and assert on what is visible or announced. Don't test internal state or implementation details. Queries by role and label double as an accessibility check.",
      body: [
        tsx(`
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmailStep } from "./EmailStep";

test("blocks Next and announces an error for an invalid email", async () => {
  const user = userEvent.setup();
  const onNext = vi.fn();
  render(<EmailStep onNext={onNext} />);

  await user.type(screen.getByLabelText(/email/i), "not-an-email");
  await user.click(screen.getByRole("button", { name: /next/i }));

  expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
  expect(screen.getByLabelText(/email/i)).toHaveAttribute("aria-invalid", "true");
  expect(onNext).not.toHaveBeenCalled();
});
`),
        trap("Using `getByTestId` everywhere, or snapshot-testing whole pages. Those tests break on harmless markup changes and miss real accessibility regressions."),
      ],
    },
    {
      id: "sb-test-junit",
      question: "Unit-test a Spring service with JUnit 5 and Mockito.",
      level: "junior",
      short:
        "Construct the class under test with mocked collaborators (constructor injection makes this trivial). Arrange the mocks' behaviour, call the method, then assert the result and verify the important interactions. Cover the happy path, each business-rule failure, and the boundaries.",
      body: [
        java(`
@ExtendWith(MockitoExtension.class)
class OnboardingServiceTest {
    @Mock ClientRepository clients;
    @Mock KycClient kyc;
    @Mock ApplicationEventPublisher events;
    @InjectMocks OnboardingService service;

    @Test
    void rejectsApplicantsUnder18ForATfsa() {
        Applicant minor = Applicant.withDateOfBirth(LocalDate.now().minusYears(17));

        assertThatThrownBy(() -> service.submit(minor, AccountType.TFSA))
            .isInstanceOf(IneligibleApplicantException.class);

        verifyNoInteractions(kyc); // no third-party call for an applicant we can't accept
    }

    @Test
    void publishesSubmittedEventOnSuccess() {
        Applicant adult = Applicant.withDateOfBirth(LocalDate.of(1995, 5, 1));
        when(kyc.verify(adult)).thenReturn(KycResult.passed());

        service.submit(adult, AccountType.TFSA);

        verify(events).publishEvent(any(ApplicationSubmitted.class));
    }
}
`),
        p("Watch the boundaries. The TFSA age of majority differs by province (18 in some, 19 in others). That is exactly the edge case an interviewer hopes you will ask about."),
      ],
    },
    {
      id: "sb-test-mocking",
      question: "When should you mock, and how do microservices test against each other?",
      level: "intermediate",
      short:
        "Mock what you don't own and what is slow or nondeterministic: third-party APIs, the clock, random ids. Prefer real implementations, or Testcontainers, for your own database and message broker, because over-mocked tests just repeat the implementation back to you. Between services, **contract tests** (Pact, or OpenAPI schema checks) verify that a provider still meets each consumer's expectations without running the whole system.",
      body: [],
    },
    {
      id: "sb-test-tdd",
      question: "Have you practised TDD? What does it give you?",
      level: "junior",
      short:
        "Red, green, refactor: write a failing test for the next small behaviour, write the simplest code that passes, then clean up with the test as a safety net. It forces small steps and testable designs, and it leaves documentation behind that actually runs. It fits rule-heavy logic best, such as eligibility and validation. Be honest about how much you have really used it.",
      body: [
        say("I find TDD most useful for business rules, where I can write the cases as a table first. For UI layout work I write the tests right after."),
      ],
    },
  ],
};

export const SB_AGILE: PrepSection = {
  id: "sb-agile",
  track: "delivery",
  title: "Agile, the SDLC, code review and production support",
  blurb:
    "GWE runs 'several agile teams', and Scotiabank's own hiring blog asks for 'specific examples of how you maintain an agile mindset'. The posting also says you'll take part in code reviews and troubleshoot production 'with guidance from senior engineers'.",
  questions: [
    {
      id: "sb-agile-scrum",
      question: "Describe Scrum: roles, events and artifacts.",
      level: "junior",
      short:
        "**Roles:** the Product Owner owns the backlog and its priorities, the Scrum Master coaches the process and removes blockers, and the developers own the delivery. **Events:** sprint planning, the daily stand-up, the sprint review (a demo to stakeholders) and the retrospective, all inside a 1–2 week sprint. **Artifacts:** the product backlog, the sprint backlog and the increment, with a sprint goal and a Definition of Done. Kanban instead focuses on flow and limits work in progress.",
      body: [
        list(
          "In the stand-up, say what moved, what's next, and what's blocking you. It's for the team, not a status report to a manager.",
          "Refinement (grooming) is where compliance or architecture questions should come up, not in the middle of a sprint.",
        ),
      ],
    },
    {
      id: "sb-agile-estimation",
      question: "How do you estimate work, and what goes into a Definition of Done?",
      level: "junior",
      short:
        "Story points measure relative size (complexity, uncertainty, effort), usually on a Fibonacci-like scale, agreed in planning poker so differences of opinion come out. Split anything too big to finish in a sprint. In a bank, a Definition of Done usually means: code reviewed, tests written and passing, security scans clean, accessibility checked, documentation and runbook updated, deployed to the test environment, and accepted by the product owner.",
      body: [
        trap("Treating points as hours, or comparing velocity between teams. Points are only meaningful within one team."),
      ],
    },
    {
      id: "sb-agile-sdlc-bank",
      question: "How does the SDLC change in a regulated bank?",
      level: "junior",
      short:
        "The same phases (requirements, design, build, test, release, operate), with more controls. Every production change is traceable to a ticket. Separation of duties means the person who writes a change can't approve and deploy it alone; OSFI's guideline B-13 expects this. Security scans must pass before release. Changes go through change management, with approvals and release windows. Audit evidence is kept, and compliance and risk teams review features that touch client data or regulatory rules.",
      body: [
        list(
          "**OSFI B-13** (technology and cyber risk, in force since January 2024): security built into the SDLC, scanning before release, privileged credentials kept in vaults, logging, and root-cause analysis after incidents.",
          "**OSFI B-10** (third-party risk): matters when a feature depends on a vendor, such as an identity-verification provider.",
          "Agile and compliance can coexist: put the controls into the pipeline (automated evidence) instead of slowing teams down with manual gates.",
        ),
        say("I'd rather have the pipeline produce the audit evidence automatically than fill in forms after the fact."),
      ],
    },
    {
      id: "sb-code-review",
      question: "What do you look for in a code review, and how do you take feedback on your own code?",
      level: "junior",
      short:
        "As a reviewer: correctness and edge cases first, then security (authorisation, input validation, personal data in logs), tests, readability and naming, and fit with the team's standards. Comment on the code, not the person, give a reason, and separate blocking issues from nits. As the author: keep PRs small, describe the why, self-review first, assume good intent, ask questions when you disagree, and say thank you.",
      body: [
        say("As a junior, the most useful thing I do in a review is ask 'what happens if…?'. Half the time it finds an edge case, and the other half I learn why it can't happen."),
      ],
    },
    {
      id: "sb-troubleshoot-prod",
      question: "A user reports that onboarding fails at the 'submit' step in production. What do you do?",
      level: "junior",
      short:
        "Stabilise, then diagnose. How big is it: one user or all users, and since when, perhaps since the last deploy? Check dashboards and alerts. Find the failing requests by correlation id in the logs (Splunk) and traces (Dynatrace). Form a hypothesis, reproduce it in a lower environment, and roll back if a recent release is the likely cause. Fix forward with a test. Then write a blameless post-mortem with action items. Escalate early to the senior engineer on call.",
      body: [
        steps(
          "Triage: impact, start time, recent changes (deploys, configuration, a vendor incident).",
          "Mitigate: a rollback, turning off a feature flag, or a workaround for affected clients.",
          "Diagnose: logs and traces by correlation id, error rates per endpoint, downstream health (KYC vendor, database).",
          "Fix: a failing test first, then the fix through the normal pipeline (no hotfixes straight into prod).",
          "Learn: root cause, why it wasn't caught, alerting gaps, and documentation.",
        ),
        trap("Debugging in production with ad-hoc data fixes, or copying client data to your laptop to reproduce the bug. Use masked data in a lower environment."),
      ],
    },
  ],
};
