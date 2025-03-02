import { createContext, useContext, useState } from "react";
import { createStore, useStore } from "zustand";

// export interface AppStore {
//     user: any;
//     setUser: (user: any) => void;
// }

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [store] = useState(
    () =>
      createStore
      ((set) => ({
        user: {},
        actions: {
          setUser: (user) => set((state) => ({ ...state, user })),
        },
      }))
  );
  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};

const useAppStore = (selector) => {
  const store = useContext(AppContext);
  console.log("store", store);
  console.log("selector", selector);
  if (!store) {
    throw new Error("useAppStore must be used within a AppProvider");
  }
  return useStore(store, selector);
};

export const useActions = () => useAppStore((state) => state.actions);
export const useUser = () => useAppStore((state) => state.user);

// export const useAuth = () => {
//     const queryClient = useQueryClient();

//     const login = async (username, password) => {
//         // Perform login request
//         const response = await fetch('/api/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ username, password }),
//         });

//         if (response.ok) {
//             const user = await response.json();
//             useAuthStore.setState({ user });
//             return user;
//         }

//         throw new Error('Login failed');
//     };

//     const logout = async () => {
//         // Perform logout request
//         const response = await fetch('/api/logout');

//         if (response.ok) {
//             useAuthStore.setState({ user: null });
//             queryClient.clear();
//         }
//     };

//     return { login, logout };
// }
