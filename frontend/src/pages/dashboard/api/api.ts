import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { axiosInstance } from "../../../config/axios";
import { DashboardSummaryResponse } from "./types";

export const useFetchDashboardData =
  (): UseMutationResult<DashboardSummaryResponse> => {
    return useMutation({
      mutationFn: async (): Promise<DashboardSummaryResponse> => {
        const response = await axiosInstance.get("/dashboard/summary");
        return response.data;
      },
    });
  };
