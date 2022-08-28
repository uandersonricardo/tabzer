import { createContext, ReactNode, useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";

import useFetch from "../hooks/useFetch";
import signInRequest, { SignInRequestBody } from "../requests/signIn";
import signUpRequest, { SignUpRequestBody } from "../requests/signUp";

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  bio: string | null;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  signIn: (data: SignInRequestBody) => Promise<void>;
  signUp: (data: SignUpRequestBody) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("access-token");

  if (!token) {
    return null;
  }

  return token;
};

interface AuthProviderProps {
  children?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getTokenFromLocalStorage());
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  const isAuthenticated = !!token;

  const { data: fetchData, error: fetchError } = useFetch(
    "/user",
    {},
    {
      enabled: isAuthenticated
    }
  );

  useEffect(() => {
    if (fetchData) {
      setUser(fetchData.user);
    }
  }, [fetchData]);

  useEffect(() => {
    if (fetchError) {
      localStorage.removeItem("access-token");
      setUser(null);

      toast({
        title: "Atenção!",
        description: "Entre novamente.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
    }
  }, [fetchError]);

  const signIn = async (body: SignInRequestBody) => {
    const res = await signInRequest(body);

    localStorage.setItem("access-token", res.data.token);

    setToken(res.data.token);
    setUser(res.data.user);
  };

  const signOut = () => {
    localStorage.removeItem("access-token");

    setToken(null);
    setUser(null);
  };

  const signUp = async (body: SignUpRequestBody) => {
    await signUpRequest(body);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
