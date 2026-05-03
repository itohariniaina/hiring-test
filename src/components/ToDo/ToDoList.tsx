import { ErrorMessage } from "../ErrorMessage";

import ToDoFilter from "./ToDoFilter";
import TodoForm from "./ToDoForm";
import TodoList from "./ToDoListItems";

import type { ToDo } from "../../types/ToDo";

type ToDoMainListProps = {
  todos: ToDo[];
  checkedToDos: ToDo[];
  addTodoToList: (todo: ToDo) => void;
  handleDelete: (id: string) => void;
  handleCheck: (id: string) => void;

  filterText: string;
  setFilterText: (text: string) => void;
  filteredToDos: ToDo[];
};

const ToDoList = (props: ToDoMainListProps) => {
  return (
    <>
      <h2>To Do List</h2>
      <p>
        ToDo's done {props.checkedToDos.length} | Total {props.todos.length}
      </p>
      <TodoForm onSubmit={props.addTodoToList} />
      <ToDoFilter
        filterText={props.filterText}
        setFilterText={props.setFilterText}
      />

      {props.filteredToDos.length > 0 ? (
        <>
          {props.filterText.length > 0 && (
            <p style={{ textAlign: "left", marginTop: 10 }}>
              Number of items found {props.filteredToDos.length}
            </p>
          )}
          <TodoList
            todos={props.filteredToDos}
            deleteToDo={props.handleDelete}
            check={props.handleCheck}
          />
        </>
      ) : (
        <ErrorMessage error={"No items found"} />
      )}
    </>
  );
};
export default ToDoList;
