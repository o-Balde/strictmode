import { fail, ok, type Routes } from "../../shared/mock-server";
import type { ApiTask, User } from "./contract";

/** What `GET /api/tasks` serves: the same tasks as data.json, now with owners. */
export const API_TASKS: ApiTask[] = [
  {
    id: "t1",
    title: "Design review",
    description: "Walk through the new dashboard",
    status: "IN_PROGRESS",
    assignedUser: "u1",
  },
  {
    id: "t3",
    title: "Write release notes",
    description: "Summarise the sprint for customers",
    status: "TO_DO",
    assignedUser: "u2",
  },
  {
    id: "t4",
    title: "Fix flaky test",
    description: "checkout.spec times out on CI",
    status: "TO_DO",
    assignedUser: "u1",
  },
  {
    id: "t5",
    title: "Fix flaky test",
    description: "search.spec fails on Mondays",
    status: "TO_DO",
  },
];

export const USERS: User[] = [
  { id: "u1", firstName: "Andrew", lastName: "Quill" },
  { id: "u2", firstName: "Grace", lastName: "Hopper" },
];

export const routes: Routes = {
  "GET /api/tasks": () => ok({ data: API_TASKS }),
  "GET /api/users/:id": ({ params }) => {
    const user = USERS.find((candidate) => candidate.id === params.id);
    return user ? ok(user) : fail(404, { error: "User not found" });
  },
};
