import { useEffect, useState } from "react";
import { ErrorMessage } from "./components/ErrorMessage";
import type { User } from "./types/User";
import type { ToDo } from "./types/ToDo";
import LoadingComponent from "./components/LoadingComponent";
import ToDoList from "./components/ToDo/ToDoList";
import { UserCard } from "./components/User/UserCard";

const App = () => {
  const [userData, setUserData] = useState<User>({
    avatar_url: "",
    name: "",
    company: "",
    hireable: false,
    created_at: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [filterText, setFilterText] = useState("");

  const getUserData = async () => {
    const response = await fetch(`https://api.github.com/users/itohariniaina`);
    const jsonData = await response.json();
    //console.log("userData", JSON.stringify(jsonData, null, 2));
    setUserData(jsonData);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await getUserData();
        setIsLoading(true);
      } catch (e) {
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
              <UserCard {...userData} />
            </div>
            <ToDoList
              todos={todos}
              checkedToDos={checkedToDos}
              addTodoToList={addTodoToList}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
              filterText={filterText}
              setFilterText={setFilterText}
              filteredToDos={filteredToDos}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
