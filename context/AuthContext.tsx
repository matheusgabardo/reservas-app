import { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/api/axios";
import LoadingOverlay from "@/app/components/LoadingOverlay";

interface AuthContextProps {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

async function getStoredToken(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch {
    return null;
  }
}

async function setStoredToken(key: string, value: string): Promise<void> {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (e) {
    console.error("Erro ao salvar token:", e);
  }
}

async function removeStoredToken(key: string): Promise<void> {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (e) {
    console.error("Erro ao remover token:", e);
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const savedToken = await getStoredToken("token");
      if (savedToken) {
        setToken(savedToken);
        api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
        try {
          const { data } = await api.get("/me");
          setUser(data);
        } catch {
          await removeStoredToken("token");
          setToken(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/login", { email, password });
      const receivedToken = response.data.token;
      setToken(receivedToken);
      api.defaults.headers.common.Authorization = `Bearer ${receivedToken}`;
      await setStoredToken("token", receivedToken);

      const { data } = await api.get("/me");
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ name, email, password, confirmPassword }: { name: string; email: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      // Após registro, faz login automático
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
    } catch {
      /* ignore */
    }
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common.Authorization;
    await removeStoredToken("token");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
      <LoadingOverlay visible={loading} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
