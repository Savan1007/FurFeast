import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import {
  GetAllUsersQueryParams,
  GetAllUsersResponse,
  InsertUser,
  GetAllRoles,
  UserExistsResponse,
} from "./types";

export const useGetAllRoles = (): UseMutationResult<GetAllRoles> => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/auth/role");
      const transformedData = response.data.data.map((role: any) => ({
        id: role.id,
        name: role.name,
        description: role.description,
      }));
      response.data.data = transformedData;
      console.log("Roles", response.data);
      return response.data;
    },
  });
};

export const useAddNewUser = (): UseMutationResult<
  unknown,
  { username: string; email: string; password: string; role: string },
  InsertUser
> => {
  return useMutation({
    mutationFn: async (newUser: InsertUser) => {
      const response = await axiosInstance.post("/auth/create", newUser);
      return response.data;
    },
  });
};

export const useGetAllUsers = (): UseMutationResult<
  GetAllUsersResponse,
  unknown,
  GetAllUsersQueryParams
> => {
  return useMutation({
    mutationFn: async (queryParams: GetAllUsersQueryParams) => {
      const queryString = new URLSearchParams(
        queryParams as Record<string, string>
      ).toString();
      const response = await axiosInstance.get(`/auth/users?${queryString}`);
      return response.data;
    },
  });
};

export const useCheckUserExists = (): UseMutationResult<UserExistsResponse, unknown, string> => {
  return useMutation({
    mutationFn: async (username: string) => {
      const response = await axiosInstance.get(`/auth/username-exists?username=${username}`);
      return response.data;
    },
  });
};
