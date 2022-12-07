import { useEffect, createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState();

  const changeUser = (new_user) => {
    setUser((_) => new_user);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    changeUser(user);
  }, [changeUser]);

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
