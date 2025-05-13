import { useContext, createContext, useState, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import TextCustom from "../app/components/TextCustom";

// Simulação de account API
const fakeUser = { $id: "user123", name: "Matheus", email: "matheus@email.com" };
let fakeSession = null;

const mockAccount = {
  get: () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fakeSession) {
          resolve(fakeUser);
        } else {
          reject(new Error("No active session"));
        }
      }, 500);
    }),

  createEmailPasswordSession: (email, password) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "matheus@email.com" && password === "123456") {
          fakeSession = { $id: "session123", userId: "user123" };
          resolve(fakeSession);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500);
    }),

  deleteSession: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        fakeSession = null;
        resolve();
      }, 500);
    }),
};

// CONTEXT
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await checkAuth();
  };

  const checkAuth = async () => {
    try {
      const response = await mockAccount.get();
      setUser(response);
      setSession({ $id: "session123" });
    } catch (error) {
      console.log("Auth error:", error.message);
    }
    setLoading(false);
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const responseSession = await mockAccount.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await mockAccount.get();
      setUser(responseUser);
    } catch (error) {
      console.log("Login error:", error.message);
    }
    setLoading(false);
  };

  const register = async ({ email, password, confirmPassword  }) => {
    setLoading(true);
    try {
      const responseSession = await mockAccount.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await mockAccount.get();
      setUser(responseUser);
    } catch (error) {
      console.log("Login error:", error.message);
    }
    setLoading(false);
  };

  const signout = async () => {
    setLoading(true);
    await mockAccount.deleteSession();
    setSession(null);
    setUser(null);
    setLoading(false);
  };

  const contextData = { session, user, login, signout, register };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <TextCustom fontSize={48}>Loading...</TextCustom>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
