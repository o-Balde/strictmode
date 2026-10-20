import type { BoardData } from "../contract";
import data from "../data.json";

/**
 * TASK BOARD: your workspace. Level 1 starts here.
 *
 * The designer's static template is rendered below as-is. Replace the
 * hard-coded column and card with the tasks from data.json, following the
 * Level 1 spec on the prep page. Keep every className and data-testid the
 * spec names: the grader looks elements up by them.
 *
 *   npm run level -- task-board 1      run Level 1's specs
 *   npm run dev → ?mock=task-board     live preview
 */
const board = data as BoardData;

export default function App() {
  void board;

  return (
    <div className="board">
      <h2 className="board__title">Tasks</h2>
      <div className="board__columns">
        <section className="column" data-testid="column-TO_DO">
          <h2 className="column__title">To do</h2>
          <span className="column__count" data-testid="count-TO_DO">
            1
          </span>
          <div className="column__cards">
            <div className="card" data-testid="card-t1">
              <h3 className="card__title">Task 1</h3>
              <p className="card__description">Detailed task 1 description</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
