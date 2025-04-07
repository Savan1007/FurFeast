import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { AuthResponse, Credentials, FetchUserResponse } from "./types";
import { axiosInstance } from "../../../config/axios";
import { useAccessToken } from "../../../store/app-store";

export const useAuth = (): UseMutationResult<
  AuthResponse,
  unknown,
  Credentials
> => {
  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data as AuthResponse;

      // // Mock implementation
      // if (
      //   credentials.username === "admin" &&
      //   credentials.password === "admin"
      // ) {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve({
      //         data: {
      //           id: 1,
      //           username: "admin",
      //           email: "admin@example.com",
      //           role: Role.SuperAdmin,
      //         },
      //         auth: true,
      //       });
      //     }, 1000);
      //   });
      // } else {
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve({
      //         data: { id: 0, username: "", email: "", role: Role.NULL },
      //         auth: false,
      //       });
      //     }, 1000);
      //   });
      // }
    },
  });
};

export const useLogout = (): UseMutationResult<void, unknown, string> => {
  const accessToken = useAccessToken()
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.post("/auth/logout", {user: id}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });
};

export const useFetchUser = (): UseMutationResult<
  FetchUserResponse,
  unknown,
  string
> => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.get(`/auth/user/${id}`);
      return response.data;
    },
  });
};
