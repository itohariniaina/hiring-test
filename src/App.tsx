import { useEffect, useState } from "react";
import { Card } from "./components/Card";
import type { User } from "./types/User";

const App = () => {
  const [userData, setUserData] = useState<User>({
    avatar_url: "",
    name: "",
    company: "",
  });

  const getUserData = async () => {
    const response = await fetch(`https://api.github.com/users/itohariniaina`);
    const jsonData = await response.json();
    setUserData(jsonData);
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        await getUserData();
      } catch (e) {
        console.log(e);
      }
    };
    loadUser();
  }, []);

  return (
    <div>
      <Card {...userData} />
    </div>
  );
};

export default App;
