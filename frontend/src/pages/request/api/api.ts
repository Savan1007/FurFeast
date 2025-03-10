import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { Requests, InsertFoodRequest, Suppliers, FoodRequest } from "./types";
import axiosInstance from "../../../config/axios";
import { data } from "react-router-dom";

const mapResponseToData = (response: any) => {
  if (!Array.isArray(response.data)) {
    throw new Error("Expected response.data to be an array");
  }
  return response.data.map((item: any) => {
    const date = new Date(item.createdAt);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}th, ${date.getFullYear()}`;
    return {
      supplierId: item.supplier_id,
      category: item.donation_category === "food" ? "Foods" : "Miscellaneous",
      subcategory: `${item.food_type.charAt(0).toUpperCase() + item.food_type.slice(1)}'s ${item.food_form} foods (${item.unit})`,
      quantity: item.quantity,
      unit: item.unit,
      status: item.status,
      requestDate: formattedDate,
    };
  });
};


export const useFetchAllRequest = (): UseMutationResult<
  Requests,
  unknown
> => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/donation");
      const res =  mapResponseToData(response.data);;
      console.log("response", {data: res});
      return {data: res} ;

      // Mock implementation

      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve([
      //       {
      //         id: 1,
      //         status: "pending",
      //         userId: 1,
      //         items: ["apple", "banana"],
      //         quantities: [2, 3],
      //         requestDate: new Date(),
      //         approvedBy: null,
      //       },
      //       {
      //         id: 2,
      //         status: "approved",
      //         userId: 2,
      //         items: ["orange", "pear"],
      //         quantities: [1, 4],
      //         requestDate: new Date(),
      //         approvedBy: 1,
      //       },
      //     ]);
      //   }, 1000);
      // });
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
        "Dog's Dry foods (KG)": { food_type: "dog", food_form: "dry", unit: "kg" },
        "Dog's Wet foods (Cans)": { food_type: "dog", food_form: "wet", unit: "can" },
        "Cat's Dry foods (KG)": { food_type: "cat", food_form: "dry", unit: "kg" },
        "Cat's Wet foods (Cans)": { food_type: "cat", food_form: "wet", unit: "can" },
      };

      const { food_type, food_form, unit } =
        subCategoryMap[newRequest.details[0].subCategory];

      const payload = {
        donation: {
          supplier_id: newRequest.supplierId,
          donation_category: newRequest.details[0].category === "Foods" ? "food" : "miscellaneous",
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
