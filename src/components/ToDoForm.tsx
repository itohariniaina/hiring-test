import React, { useState } from "react";
import type { ToDo } from "../types/ToDo";
type ToDoFormProps = {
  onSubmit: (todo: ToDo) => void;
};

const TodoForm = (props: ToDoFormProps) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    props.onSubmit({
      id: new Date().getTime().toString(),
      text: todo,
      completed: false,
    });
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <input
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
        type="text"
        placeholder="Enter a task"
        required
      ></input>
      <button type="submit" style={{ marginLeft: 25, height: 25 }}>
        {" "}
        Add
      </button>
    </form>
  );
};

export default TodoForm;
