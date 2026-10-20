import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { fail, offline, ok } from "../../../shared/mock-server";
import { deferred } from "../../../test/fetch";
import { API_TASKS, USERS } from "../server";
import { column, renderApp, renderBoard } from "./support";

const assignee = (id: string) => screen.getByTestId(`card-${id}`).querySelector(".card__assignee")?.textContent;

describe("Level 3: consuming an API", () => {
  it("shows a loading message until the tasks arrive", async () => {
    const gate = deferred<void>();
    renderApp({
      "GET /api/tasks": async () => {
        await gate.promise;
        return ok({ data: API_TASKS });
      },
    });

    expect(screen.getByTestId("board-status")).toHaveTextContent("Loading tasks...");
    expect(screen.queryByTestId("card-t1")).toBeNull();

    gate.resolve();
    expect(await screen.findByTestId("card-t1")).toBeInTheDocument();
    expect(screen.queryByTestId("board-status")).toBeNull();
  });

  it("renders the tasks the API returns, in their columns", async () => {
    await renderBoard();
    expect(within(column("IN_PROGRESS")).getByTestId("card-t1")).toBeInTheDocument();
    expect(within(column("TO_DO")).getByTestId("card-t5")).toBeInTheDocument();
  });

  it("shows who each task is assigned to", async () => {
    await renderBoard();
    expect(assignee("t1")).toBe("Assigned to Andrew Quill");
    expect(assignee("t3")).toBe("Assigned to Grace Hopper");
    expect(assignee("t4")).toBe("Assigned to Andrew Quill");
    expect(assignee("t5")).toBe("Unassigned");
  });

  it("requests every distinct user once, all at the same time", async () => {
    const gates = { u1: deferred<void>(), u2: deferred<void>() };
    const { api } = renderApp({
      "GET /api/users/:id": async ({ params }) => {
        await gates[params.id as keyof typeof gates].promise;
        return ok(USERS.find((user) => user.id === params.id));
      },
    });

    // Both requests must be in flight before either answers: no awaiting one by one.
    await waitFor(() => {
      expect(api.count("GET", "/api/users/u1")).toBe(1);
      expect(api.count("GET", "/api/users/u2")).toBe(1);
    });
    gates.u1.resolve();
    gates.u2.resolve();

    await screen.findByTestId("card-t1");
    expect(api.count("GET", "/api/users/u1")).toBe(1);
    expect(api.count("GET", "/api/tasks")).toBe(1);
  });

  it("reports a failed response, then recovers on Retry", async () => {
    const user = userEvent.setup();
    let healthy = false;
    // The error body still parses as JSON with a `data` key: only `response.ok` tells it apart.
    renderApp({
      "GET /api/tasks": () => (healthy ? ok({ data: API_TASKS }) : fail(500, { data: [], error: "Database unavailable" })),
    });

    expect(await screen.findByTestId("board-error")).toHaveTextContent("Could not load tasks");
    expect(screen.getByRole("alert")).toBe(screen.getByTestId("board-error"));
    expect(screen.queryByTestId("card-t1")).toBeNull();

    healthy = true;
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(await screen.findByTestId("card-t1")).toBeInTheDocument();
    expect(screen.queryByTestId("board-error")).toBeNull();
  });

  it("reports a network failure the same way", async () => {
    renderApp({ "GET /api/tasks": () => offline() });
    expect(await screen.findByTestId("board-error")).toHaveTextContent("Could not load tasks");
  });

  it("keeps the board up when one user cannot be loaded", async () => {
    await renderBoard({
      "GET /api/users/:id": ({ params }) =>
        params.id === "u2" ? fail(503) : ok(USERS.find((user) => user.id === params.id)),
    });
    expect(assignee("t3")).toBe("Assigned to Unknown user");
    expect(assignee("t1")).toBe("Assigned to Andrew Quill");
  });

  it("marks tasks created with the form as unassigned", async () => {
    const user = userEvent.setup();
    await renderBoard();
    await user.type(screen.getByPlaceholderText("Task title*"), "Brand new");
    await user.type(screen.getByPlaceholderText("Task description*"), "Nobody owns this yet");
    await user.click(screen.getByRole("button", { name: "Create task" }));

    const card = within(column("TO_DO")).getByText("Brand new").closest<HTMLElement>(".card");
    expect(card?.querySelector(".card__assignee")).toHaveTextContent("Unassigned");
  });
});
