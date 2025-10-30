import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cc_user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required");
    const response = await api.login({ email, password });
    // response expected: { id, fullName, email, role, createdAt, token }
    const authUser = {
      id: response.id,
      name: response.fullName,
      email: response.email,
      role: response.role,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      phoneNumber: response.phoneNumber,
      dateOfBirth: response.dateOfBirth,
      gender: response.gender,
      addressLine1: response.addressLine1,
      addressLine2: response.addressLine2,
      city: response.city,
      state: response.state,
      postalCode: response.postalCode,
      country: response.country,
      avatarUrl: response.avatarUrl,
      token: response.token,
    };
    setUser(authUser);
    localStorage.setItem("cc_user", JSON.stringify(authUser));
    return authUser;
  };

  const register = async (payload) => {
    console.log("AuthContext register called with:", payload);
    const { fullName, email, password } = payload || {};
    if (!fullName || !email || !password) throw new Error("All fields are required");
    console.log("Calling api.register with:", payload);
    const response = await api.register(payload);
    console.log("API response:", response);
    const authUser = {
      id: response.id,
      name: response.fullName,
      email: response.email,
      role: response.role,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      phoneNumber: response.phoneNumber,
      dateOfBirth: response.dateOfBirth,
      gender: response.gender,
      addressLine1: response.addressLine1,
      addressLine2: response.addressLine2,
      city: response.city,
      state: response.state,
      postalCode: response.postalCode,
      country: response.country,
      avatarUrl: response.avatarUrl,
      token: response.token,
    };
    console.log("Setting user:", authUser);
    setUser(authUser);
    localStorage.setItem("cc_user", JSON.stringify(authUser));
    return authUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cc_user");
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error("Not authenticated");
    const updated = await api.updateUser(user.id, updates);
    const authUser = {
      id: updated.id,
      name: updated.fullName,
      email: updated.email,
      role: updated.role,
      createdAt: updated.createdAt,
      phoneNumber: updated.phoneNumber,
      dateOfBirth: updated.dateOfBirth,
      gender: updated.gender,
      addressLine1: updated.addressLine1,
      addressLine2: updated.addressLine2,
      city: updated.city,
      state: updated.state,
      postalCode: updated.postalCode,
      country: updated.country,
      avatarUrl: updated.avatarUrl,
      token: (user && user.token) || undefined,
    };
    setUser(authUser);
    localStorage.setItem("cc_user", JSON.stringify(authUser));
    return authUser;
  };

  const value = useMemo(() => ({ user, isLoading, login, logout, register, updateProfile }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


