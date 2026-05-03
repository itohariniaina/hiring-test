import { useEffect, useState } from "react";
import { Card } from "./components/User/Card";
import { ErrorMessage } from "./components/ErrorMessage";
import type { User } from "./types/User";
import type { ToDo } from "./types/ToDo";
import TodoForm from "./components/ToDo/ToDoForm";
import TodoList from "./components/ToDo/ToDoList";
import ToDoFilter from "./components/ToDo/ToDoFilter";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const [userData, setUserData] = useState<User>({
    avatar_url: "",
    name: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filterText, setFilterText] = useState("");

  const getUserData = async () => {
    const response = await fetch(`https://api.github.com/users/itohariniaina`);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await getUserData();
        setIsLoading(true);
      } catch (e) {
        console.log(e);
        if (e instanceof Error) {
          setErrorMessage(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const addTodoToList = (newTodo: ToDo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleCheck = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const checkedToDos = todos.filter((todo) => todo.completed);

  const filteredToDos = todos.filter((t) =>
    t.text.toLowerCase().includes(filterText.toLowerCase()),
  );
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : errorMessage ? (
        <ErrorMessage error={errorMessage} />
      ) : (
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card {...userData} />
            </div>

            <h2>To Do List</h2>
            <p>
              ToDo's done {checkedToDos.length} | Total {todos.length}
            </p>
            <TodoForm onSubmit={addTodoToList} />
            <ToDoFilter filterText={filterText} setFilterText={setFilterText} />

            {filteredToDos.length > 0 ? (
              <>
                {filterText.length > 0 && (
                  <p style={{ textAlign: "left", marginTop: 10 }}>
                    Number of items found {filteredToDos.length}
                  </p>
                )}
                <TodoList
                  todos={filteredToDos}
                  deleteToDo={handleDelete}
                  check={handleCheck}
                />
              </>
            ) : (
              <ErrorMessage error={"No items found"} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
