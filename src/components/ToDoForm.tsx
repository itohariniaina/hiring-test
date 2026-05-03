import React, { useState } from "react";
import type { ToDo } from "../types/ToDo";
type ToDoFormProps = {
  onSubmit: (todo: ToDo) => void;
};

const TodoForm = (props: ToDoFormProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    props.onSubmit({
      id: new Date().getTime().toString(),
      text: text,
      completed: false,
    });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
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
