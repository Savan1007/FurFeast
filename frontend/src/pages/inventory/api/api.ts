import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import { InventoryApiResponse, UpdateInventory } from "./types";

export const useFetchAllInventory = (): UseMutationResult<
  InventoryApiResponse
> => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/inventory");
      return response.data;
    },
  });
};

export const useUpdateInventory = (): UseMutationResult<
  InventoryApiResponse,
  unknown,
  { id: string; data: UpdateInventory }
> => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      console.log("data", data);
      const response = await axiosInstance.put(`/inventory/update/${id}`, data);
      return response.data;
    },
  });
};
