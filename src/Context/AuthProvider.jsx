import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginStorage, logoutStorage, getLoggedUser } from "../utils/localStorageLogin";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getLoggedUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    try {
      loginStorage(email, password);
      const updatedUser = getLoggedUser();
      setUser(updatedUser);
    } catch (erro) {
      throw new Error(erro.message);
    }
  };

  const logout = () => {
    logoutStorage();
    setUser(null);
  };

  const isLogged = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
