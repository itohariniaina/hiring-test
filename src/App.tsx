import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { ErrorMessage } from "./components/ErrorMessage";
import type { User } from "./types/User";
import type { ToDo } from "./types/ToDo";
import TodoForm from "./components/ToDoForm";
import TodoList from "./components/ToDoList";

const App = () => {
  const [userData, setUserData] = useState<User>({
    avatar_url: "",
    name: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);

  const getUserData = async () => {
    const response = await fetch(`https://api.github.com/users/itohariniaina`);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {isLoading ? (
        <div>
          <p style={{ color: "white" }}>Loading ...</p>
        </div>
      ) : errorMessage ? (
        <ErrorMessage error={errorMessage} />
      ) : (
        <>
          <Card {...userData} />

          <div className="App">
            <h1>To Do List</h1>
            <TodoForm onSubmit={addTodoToList} />
          </div>

          <TodoList
            todos={todos}
            deleteToDo={handleDelete}
            check={handleCheck}
          />
        </>
      )}
    </div>
  );
};

export default App;
