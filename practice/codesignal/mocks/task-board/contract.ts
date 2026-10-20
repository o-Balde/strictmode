/**
 * Task board: the types and endpoints the levels refer to. Read-only, the way
 * a CodeSignal task's provided files are; your code goes in src/.
 */
export type Status = "TO_DO" | "IN_PROGRESS" | "DONE";

/** A task as data.json stores it (Level 1). */
export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

/** The shape of data.json. */
export interface BoardData {
  todoItems: Task[];
  inProgressItems: Task[];
  doneItems: Task[];
}

/** A task as `GET /api/tasks` returns it (Level 3). Note the extra field. */
export interface ApiTask extends Task {
  assignedUser?: string;
}

/** `GET /api/tasks` responds with `{ data: ApiTask[] }`. */
export interface TasksResponse {
  data: ApiTask[];
}

/** `GET /api/users/{id}` responds with one of these. */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export const API = {
  tasks: "/api/tasks",
  user: (id: string) => `/api/users/${encodeURIComponent(id)}`,
} as const;
