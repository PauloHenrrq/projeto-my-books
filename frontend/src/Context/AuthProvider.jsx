import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("authToken")
    if (user) {
      setUser(true);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null);
  };

  const isLogged = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, setUser, isLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
