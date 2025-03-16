import { createContext, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AppStore {
  user?: User;
  actions?: {
    setUser: (user: User) => void;
    logout: () => void;
  };
}

export const AppContext = createContext<StoreApi<AppStore> | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  initialValues?: Omit<AppStore, "actions">;
}   

export const AppProvider = ({ children, initialValues }: AppProviderProps) => {
  const [store] = useState(() =>
  createStore<AppStore>((set) => ({
    ...(initialValues ?? {}),
    actions: {
    setUser: (user) => set({ user }),
    logout: () => set({ user: undefined }),
    },
    ...initialValues,
  }))
  );
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

const useAppStore = <T, >(selector: (state: AppStore) => T) => {
  const store = useContext(AppContext);
  if (!store) {
  throw new Error("useAppStore must be used within a AppProvider");
  }
  return useStore(store, selector);
};

export const useActions = () => useAppStore((state) => state.actions);
export const useUser = () => useAppStore((state) => state.user);
 
