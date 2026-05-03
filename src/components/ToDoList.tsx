import type { ToDo } from "../types/ToDo";
type ToDoListProps = {
  todos: ToDo[];
  deleteToDo: (id: string) => void;
  check: (id: string) => void;
};

const TodoList = (props: ToDoListProps) => {
  const handleDelete = (todoId: string) => {
    props.deleteToDo(todoId);
  };

  const handleCheck = (todoId: string) => {
    props.check(todoId);
  };

  return props.todos.map((t) => (
    <div key={t.id}>
      <div>
        <input
          type="checkbox"
          checked={t.completed}
          onChange={() => handleCheck(t.id)}
        ></input>

        {t.text}
      </div>
      <div>
        <button onClick={() => handleDelete(t.id)}>Delete</button>
      </div>
    </div>
  ));
};

export default TodoList;
