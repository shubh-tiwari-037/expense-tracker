import { createContext, useEffect, useState, useCallback } from "react";
import { getMeApi, loginApi, logoutApi, registerApi,  googleAuthApi, } from "../apis/authApi";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const res = await getMeApi();
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    setUser(res.user);
    return res;
  };

  const googleAuth = async (token) => {
  const res = await googleAuthApi(token);

  // Backend has already set the cookies.
  // Fetch the logged-in user.
  await loadUser();

  return res;
};

  const register = async (data) => {
    return registerApi(data);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "Admin",
    login,
    register,
    logout,
     googleAuth,
    refreshUser: loadUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
