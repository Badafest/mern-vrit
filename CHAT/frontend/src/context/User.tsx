import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface IUserState {
  name: string;
  access_token: string;
  refresh_token: string;
}

interface IUserContext {
  user: IUserState;
  updateUser: (
    name: string,
    access_token: string,
    refresh_token: string
  ) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUserState>({
    name: "",
    access_token: "",
    refresh_token: "",
  });

  useEffect(() => {
    setUser({
      name: localStorage.getItem("name") || "",
      access_token: localStorage.getItem("access_token") || "",
      refresh_token: localStorage.getItem("refresh_token") || "",
    });
  }, [localStorage]);

  function updateUser(
    name: string,
    access_token: string,
    refresh_token: string
  ) {
    setUser({ name, access_token, refresh_token });
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
