import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import {
  Requests,
  InsertFoodRequest,
  FoodRequest,
  GetRequestsQueryParams,
  UpdateRequest,
} from "./types";
import { axiosInstance } from "../../../config/axios";
import { data } from "react-router-dom";

export const useFetchAllRequest = (): UseMutationResult<
  Requests,
  unknown,
  GetRequestsQueryParams
> => {
  return useMutation({
    mutationFn: async (queryParams: GetRequestsQueryParams) => {
      const queryString = new URLSearchParams(
        queryParams as unknown as Record<string, string>
      ).toString();
      const response = await axiosInstance.get(`/request?${queryString}`);
      return response.data;
    },
  });
};

export const useCreateRequest = (): UseMutationResult<
  FoodRequest,
  unknown,
  InsertFoodRequest
> => {
  return useMutation({
    mutationFn: async (newRequest: InsertFoodRequest) => {
      console.log("newRequest", newRequest);

      const payload = {
        request: {
          requestedBy: newRequest.requestedBy,
          requestType: newRequest.requestType,
          notes: newRequest.notes,
        },
        requestDetails: newRequest.requestDetails.map((item) => ({
          inventoryId: item.inventoryId,
          quantity: item.quantity,
        })),
      };

      const response = await axiosInstance.post("/request", payload);
      return response.data as FoodRequest;
    },
  });
};

export const useUpdateRequest = (): UseMutationResult<
  FoodRequest,
  unknown,
  { id: string; data: UpdateRequest }
> => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axiosInstance.put(`/request/${id}`, data);
      return response.data as FoodRequest;
    },
  });
}