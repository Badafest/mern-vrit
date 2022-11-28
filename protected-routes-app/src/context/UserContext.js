import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const isUsernameTaken = (username) =>
    users.map((user) => user.username).includes(username);

  const isPasswordMatch = (username, password) =>
    users.filter(
      (user) => user.username === username && user.password === password
    )[0];

  const registerUser = ({ username, password }) => {
    if (isUsernameTaken(username)) {
      throw Error("Username already taken!");
    } else {
      setUsers((prev) => [...prev, { username, password }]);
    }
  };

  const loginUser = ({ username, password }) => {
    const matchedUser = isPasswordMatch(username, password);
    if (matchedUser) {
      setUser((_) => matchedUser);
    } else {
      throw Error("Username or Password is wrong!");
    }
  };

  return (
    <UserContext.Provider value={{ user, registerUser, loginUser }}>
      <Outlet />
    </UserContext.Provider>
  );
};
