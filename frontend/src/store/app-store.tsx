import { createContext, useContext, useEffect, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { User } from "../pages/auth/api/types";
import { useFetchUser } from "../pages/auth/api/api";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AppStore {
  authUser?: AuthUser;
  user?: User;
  accessToken?: string;
  actions?: {
    setAuthUser: (AuthUser: AuthUser) => void;
    setUser: (user: User) => void;
    setAccessToken: (accessToken: string) => void;
    logout: () => void;
  };
}

export const AppContext = createContext<StoreApi<AppStore> | undefined>(
  undefined
);

interface AppProviderProps {
  children: React.ReactNode;
  initialValues?: Omit<AppStore, "actions">;
}

export const AppProvider = ({ children, initialValues }: AppProviderProps) => {
  const [isRehydrated, setIsRehydrated] = useState(false); // Track rehydration status
  const [store] = useState(() =>
    createStore<AppStore>((set) => ({
      ...(initialValues ?? {}),
      actions: {
        setAuthUser: (authUser) => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          set({ authUser });
        },
        setUser: (user) => set({ user }),
        setAccessToken: (accessToken: string) => {
          localStorage.setItem("accessToken", accessToken);
          set({ accessToken });
        },
        logout: () => {
          localStorage.removeItem("accessToken");
          set({ authUser: undefined, accessToken: undefined });
        },
      },
      ...initialValues,
    }))
  );

  const { mutateAsync: fetchUser } = useFetchUser();

  // Rehydrate state from localStorage on app initialization
  useEffect(() => {
    const rehydrate = async () => {
      const storedUser = localStorage.getItem("authUser");
      const storedAccessToken = localStorage.getItem("accessToken");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        store.setState({
          authUser: parsedUser,
          accessToken: storedAccessToken || undefined,
        });

        if (parsedUser.id) {
          try {
            const userData = await fetchUser(parsedUser.id);
            store.setState({ user: userData.data });
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        }
      }
      setIsRehydrated(true); // Mark rehydration as complete
    };

    rehydrate();
  }, [store, fetchUser]);

  if (!isRehydrated) {
    return null; // Render nothing until rehydration is complete
  }

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

const useAppStore = <T,>(selector: (state: AppStore) => T) => {
  const store = useContext(AppContext);
  if (!store) {
    throw new Error("useAppStore must be used within a AppProvider");
  }
  return useStore(store, selector);
};

export const useActions = () => useAppStore((state) => state.actions);
export const useAuthUser = () => useAppStore((state) => state.authUser);
export const useAccessToken = () => useAppStore((state) => state.accessToken);
export const useUser = () => useAppStore((state) => state.user);
