import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { AuthResponse, Credentials } from "./types";

export const useAuth = (): UseMutationResult<
  AuthResponse,
  unknown,
  Credentials
> => {
  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      // const response = await axios.post("/api/login", credentials);
      // return response;

      // Mock implementation
      if (
        credentials.username === "admin" &&
        credentials.password === "admin"
      ) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: {
                id: 1,
                username: "admin",
                email: "admin@example.com",
                role: "admin",
              },
              auth: true,
            });
          }, 1000);
        });
      } else {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: { id: 0, username: "", email: "", role: "" },
              auth: false,
            });
          }, 1000);
        });
      }
    },
  });
};
