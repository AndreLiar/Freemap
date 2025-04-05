//src/context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import socket from "../services/socket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      const userId = await userCredential.user.uid ; // Remplace par l'ID réel de l'utilisateur
    
      const userData = {
        userId: userId,
        email: userCredential.user.email,
        token: token,
        role: JSON.parse(localStorage.getItem("user"))?.role || "freelance",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();

      const userData = {
        email: userCredential.user.email,
        token: token,
        role: "freelance",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // Sign out function
  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setCurrentUser(null);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // Check auth state on app load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userData = {
          email: user.email,
          token: storedUser?.token || null,
          role: storedUser?.role || "freelance",
        };
        setCurrentUser(userData);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, signIn, signUp, signOut: signOutUser, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
