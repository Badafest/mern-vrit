import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IUserContext {
  user?: { name: string };
  updateUser?: (name: string) => void;
}

export const UserContext = createContext<IUserContext>({});

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState({ name: "" });

  useEffect(() => {
    setUser({ name: localStorage.getItem("name") || "" });
  }, []);

  function updateUser(name: string) {
    setUser({ name });
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
