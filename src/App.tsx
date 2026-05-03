import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import { ErrorMessage } from "./components/ErrorMessage";
import type { User } from "./types/User";

const App = () => {
  const [userData, setUserData] = useState<User>({
    avatar_url: "",
    name: "",
    company: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        <Card {...userData} />
      )}
    </div>
  );
};

export default App;
