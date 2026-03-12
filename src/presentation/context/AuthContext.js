import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthRemoteDataSource } from "../../data/datasources/AuthRemoteDataSource";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.error("Token lekérdezési hiba:", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await AuthRemoteDataSource.login(email, password);
      await SecureStore.setItemAsync("userToken", data.token);
      setUserToken(data.token);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  const register = async (email, password, confirmPassword) => {
    setIsLoading(true);
    try {
      await AuthRemoteDataSource.register(email, password, confirmPassword);
      await login(email, password); 
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("userToken");
      setUserToken(null);
    } catch (error) {
      console.error("Kijelentkezési hiba:", error);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};