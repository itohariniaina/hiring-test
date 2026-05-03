import type { ToDo } from "../../types/ToDo";
type ToDoListProps = {
  todos: ToDo[];
  deleteToDo: (id: string) => void;
  check: (id: string) => void;
};

const TodoListItems = (props: ToDoListProps) => {
  return (
    <>
      <ul>
        {props.todos.map((t) => (
          <li key={t.id}>
            <div
              style={{
                display: "flex",
                gap: 10,
                alignItems: "left",
                justifyContent: "left",
                marginTop: 10,
              }}
            >
              {t.text}
              <input
                checked={t.completed}
                onChange={() => props.check(t.id)}
                type="checkbox"
              ></input>
              <button onClick={() => props.deleteToDo(t.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoListItems;
