import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { FoodRequest } from "./types";

export const useFetchAllRequest = (): UseMutationResult<
  FoodRequest[],
  unknown
> => {
  return useMutation({
    mutationFn: async () => {
      // const response = await axios.post("/api/login", credentials);
      // return response;

      // Mock implementation

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 1,
              status: "pending",
              userId: 1,
              items: ["apple", "banana"],
              quantities: [2, 3],
              requestDate: new Date(),
              approvedBy: null,
            },
            {
              id: 2,
              status: "approved",
              userId: 2,
              items: ["orange", "pear"],
              quantities: [1, 4],
              requestDate: new Date(),
              approvedBy: 1,
            },
          ]);
        }, 1000);
      });
    },
  });
};
