import { useEffect, createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", _id: "" });

  const changeUser = (new_user) => {
    setUser((_) => ({ ...new_user }));
    localStorage.setItem("user", JSON.stringify(new_user));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser((_) => JSON.parse(user));
  }, []);

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};
