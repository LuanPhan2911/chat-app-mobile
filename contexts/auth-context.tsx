import {
  currentUser,
  editCurrentUser,
  login,
  register,
} from "@/services/auth-service";
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
import { createSocket, disconnectSocket } from "@/sockets/socket";

const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  isLoading: true,
  signIn: async (email: string, password: string) => {},
  signOut: async () => {},
  signUp: async (email: string, password: string, name: string) => {},
  updateToken: async (token: string) => {},
  editUser: async (name: string) => {},
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
        const data = (await currentUser()) as UserProps;
        await createSocket();
        setUser(data);
        router.replace("/(main)/home");
      } catch (error) {
        await updateToken(null);

        router.replace("/");
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, [token]);

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    await createSocket();
    router.replace("/(main)/home");
  };
  const signUp = async (email: string, password: string, name: string) => {
    const response = await register(email, password, name);
    await updateToken(response.token);
    await createSocket();
    router.replace("/(main)/home");
  };
  const signOut = async () => {
    await updateToken(null);
    disconnectSocket();
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
  const editUser = async (name: string) => {
    const response = await editCurrentUser(name);
    await updateToken(response.token);
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signOut,
        signUp,
        updateToken,
        editUser,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
