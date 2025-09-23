import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("authToken") || false
    if (user) {
      setUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null);
  };

  const isLogged = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, isLogged, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
