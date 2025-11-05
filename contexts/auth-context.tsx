import { currentUser, login, register } from "@/services/auth-service";
import { AuthContextProps, DecodedTokenProps, UserProps } from "@/types/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  isLoading: true,
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  signUp: async (email: string, password: string, name: string) => {},
  updateToken: async (token: string) => {},
});

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const AuthProvider = (props: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        setLoading(true);
        const decodedToken = (await currentUser()) as DecodedTokenProps;
        setUser(decodedToken.user);
        router.replace("/(main)/home");
      } catch (error) {
        await updateToken(null);

        router.replace("/");
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

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
      await SecureStore.setItemAsync("token", token);
    } else {
      setToken(null);
      setUser(null);
      await SecureStore.deleteItemAsync("token");
    }
  };
  return (
    <AuthContext.Provider
      value={{ token, user, signIn, signOut, signUp, updateToken, isLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
