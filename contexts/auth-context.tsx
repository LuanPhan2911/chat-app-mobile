import { login, register } from "@/services/auth-service";
import { AuthContextProps, UserProps } from "@/types/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // For ES Modules
import { useRouter } from "expo-router";
const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  signUp: async (email: string, password: string, name: string) => {},
  updateToken: async (token: string) => {},
});

export const AuthProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();
  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };
  const signUp = async (email: string, password: string, name: string) => {
    const response = await register(email, password, name);
    await updateToken(response.token);
    router.replace("/(main)/home");
  };
  const signOut = async () => {
    await updateToken(null);
    router.replace("/(auth)/login");
  };
  const updateToken = async (token: string | null) => {
    if (token) {
      setToken(token);
      await AsyncStorage.setItem("token", token);
      const decodedValue = jwtDecode<UserProps>(token);

      setUser(decodedValue);
    } else {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
    }
  };
  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signOut, signUp, updateToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
