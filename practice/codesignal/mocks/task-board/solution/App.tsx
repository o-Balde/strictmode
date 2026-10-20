import { useEffect, useState, type FormEvent } from "react";
import { API, type Status, type TasksResponse, type User } from "../contract";

/**
 * TASK BOARD: reference solution, all four levels.
 *
 * The decision that carries every level: one flat list of tasks, each with a
 * `status`, and the columns DERIVED from it on render. Level 2 pushes onto that
 * list, Level 3 replaces where it comes from, Level 4 changes a status. Three
 * arrays (one per column, the way data.json is shaped) would have made Level 4
 * a cross-array splice and Level 3 a re-shape.
 */
const COLUMNS = [
  { status: "TO_DO", label: "To do" },
  { status: "IN_PROGRESS", label: "In progress" },
  { status: "DONE", label: "Done" },
] as const satisfies readonly { status: Status; label: string }[];

const UNKNOWN_USER = "Unknown user";

interface BoardTask {
  id: string;
  title: string;
  description: string;
  status: Status;
  /** Display name, or null when nobody is assigned. */
  owner: string | null;
}

type LoadState = "loading" | "error" | "ready";

export default function App() {
  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [attempt, setAttempt] = useState(0);

  // Level 3: load on mount and on every Retry. The `ignore` flag drops a
  // response that lands after the effect was cleaned up (unmount, or a retry
  // that superseded it), so a slow first request cannot overwrite a newer one.
  useEffect(() => {
    let ignore = false;
    setLoadState("loading");
    loadBoard().then(
      (loaded) => {
        if (ignore) return;
        setTasks(loaded);
        setLoadState("ready");
      },
      () => {
        if (!ignore) setLoadState("error");
      },
    );
    return () => {
      ignore = true;
    };
  }, [attempt]);

  // Level 2
  const addTask = (title: string, description: string) =>
    setTasks((current) => [
      ...current,
      { id: nextTaskId(current), title, description, status: "TO_DO", owner: null },
    ]);

  // Level 4: re-append rather than edit in place, so the card lands at the END
  // of its new column (columns are filtered in array order).
  const moveTask = (id: string, step: -1 | 1) =>
    setTasks((current) => {
      const task = current.find((candidate) => candidate.id === id);
      if (!task) return current;
      const target = COLUMNS[COLUMNS.findIndex((column) => column.status === task.status) + step];
      if (!target) return current;
      return [...current.filter((candidate) => candidate.id !== id), { ...task, status: target.status }];
    });

  const deleteTask = (id: string) => setTasks((current) => current.filter((task) => task.id !== id));

  if (loadState === "loading") return <p data-testid="board-status">Loading tasks...</p>;

  if (loadState === "error") {
    return (
      <div>
        <p role="alert" data-testid="board-error">
          Could not load tasks
        </p>
        <button type="button" onClick={() => setAttempt((count) => count + 1)}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="board">
        <h2 className="board__title">Tasks</h2>
        <div className="board__columns">
          {COLUMNS.map((column, columnIndex) => {
            const cards = tasks.filter((task) => task.status === column.status);
            return (
              <section key={column.status} className="column" data-testid={`column-${column.status}`}>
                <h2 className="column__title">{column.label}</h2>
                <span className="column__count" data-testid={`count-${column.status}`}>
                  {cards.length}
                </span>
                <div className="column__cards">
                  {cards.length === 0 ? <p className="column__empty">No tasks</p> : null}
                  {cards.map((task) => (
                    // The id, never the title (two tasks share one) or the index
                    // (it changes when a card moves).
                    <div key={task.id} className="card" data-testid={`card-${task.id}`}>
                      <h3 className="card__title">{task.title}</h3>
                      <p className="card__description">{task.description}</p>
                      <p className="card__assignee">{task.owner ? `Assigned to ${task.owner}` : "Unassigned"}</p>
                      <div className="card__buttons">
                        {columnIndex > 0 ? (
                          <button
                            aria-label="button left"
                            className="card__button card__button--left"
                            type="button"
                            onClick={() => moveTask(task.id, -1)}
                          />
                        ) : null}
                        {columnIndex < COLUMNS.length - 1 ? (
                          <button
                            aria-label="button right"
                            className="card__button card__button--right"
                            type="button"
                            onClick={() => moveTask(task.id, 1)}
                          />
                        ) : null}
                        <button aria-label="delete task" type="button" onClick={() => deleteTask(task.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <NewTaskForm onCreate={addTask} />
    </>
  );
}

interface NewTaskFormProps {
  onCreate: (title: string, description: string) => void;
}

/** Level 2. Controlled fields; the form element owns submit, so Enter works too. */
function NewTaskForm({ onCreate }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || !cleanDescription) {
      setError("Title and description are required");
      return;
    }
    onCreate(cleanTitle, cleanDescription);
    setTitle("");
    setDescription("");
    setError(null);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          name="taskTitle"
          placeholder="Task title*"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="input-container">
        <textarea
          name="taskDescription"
          placeholder="Task description*"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      {error ? (
        <p className="form__error" role="alert">
          {error}
        </p>
      ) : null}
      <div>
        <input type="submit" value="Create task" />
      </div>
    </form>
  );
}

/** Ids for tasks made here: unique against everything already on the board. */
let created = 0;
function nextTaskId(existing: readonly BoardTask[]): string {
  const taken = new Set(existing.map((task) => task.id));
  let id: string;
  do {
    created += 1;
    id = `new-${created}`;
  } while (taken.has(id));
  return id;
}

/** Tasks, then every distinct owner once and in parallel. */
async function loadBoard(): Promise<BoardTask[]> {
  const response = await fetch(API.tasks);
  // fetch only rejects when the network fails; a 500 still resolves.
  if (!response.ok) throw new Error(`GET ${API.tasks} failed with ${response.status}`);
  const { data } = (await response.json()) as TasksResponse;

  const ownerIds = [...new Set(data.flatMap((task) => (task.assignedUser ? [task.assignedUser] : [])))];
  const names = new Map(await Promise.all(ownerIds.map(async (id) => [id, await fetchUserName(id)] as const)));

  return data.map((task) => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    owner: task.assignedUser ? (names.get(task.assignedUser) ?? UNKNOWN_USER) : null,
  }));
}

/** One failed user must not take the board down with it. */
async function fetchUserName(id: string): Promise<string> {
  try {
    const response = await fetch(API.user(id));
    if (!response.ok) return UNKNOWN_USER;
    const user = (await response.json()) as User;
    return `${user.firstName} ${user.lastName}`;
  } catch {
    return UNKNOWN_USER;
  }
}
