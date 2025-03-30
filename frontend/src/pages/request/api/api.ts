import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { Requests, InsertFoodRequest, Suppliers, FoodRequest, GetRequestsQueryParams } from "./types";
import { axiosInstance } from "../../../config/axios";
import { data } from "react-router-dom";


export const useFetchAllRequest = (): UseMutationResult<Requests, unknown, GetRequestsQueryParams> => {
  return useMutation({
    mutationFn: async (queryParams: GetRequestsQueryParams) => {
      const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString();
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
      const subCategoryMap: {
        [key: string]: { food_type: string; food_form: string; unit: string };
      } = {
        "Dog's Dry foods (KG)": {
          food_type: "dog",
          food_form: "dry",
          unit: "kg",
        },
        "Dog's Wet foods (Cans)": {
          food_type: "dog",
          food_form: "wet",
          unit: "can",
        },
        "Cat's Dry foods (KG)": {
          food_type: "cat",
          food_form: "dry",
          unit: "kg",
        },
        "Cat's Wet foods (Cans)": {
          food_type: "cat",
          food_form: "wet",
          unit: "can",
        },
      };

      const { food_type, food_form, unit } =
        subCategoryMap[newRequest.details[0].subCategory];

      const payload = {
        donation: {
          supplier_id: newRequest.supplierId,
          donation_category:
            newRequest.details[0].category === "Foods"
              ? "food"
              : "miscellaneous",
          food_type,
          food_form,
          quantity: newRequest.details[0].quantity,
          unit: newRequest.details[0].category === "Foods" ? unit : "piece",
        },
      };
      const response = await axiosInstance.post("/donation", payload);
      return response.data as FoodRequest;
    },
  });
};

export const useFetchAllSuppliers = (): UseMutationResult<
  Suppliers,
  unknown
> => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/suppliers");
      console.log("data", response.data);
      return response.data as Suppliers;
    },
  });
};
