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

  const logout = () => {
    logoutStorage();
    setUser(null);
  };

  const isLogged = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
