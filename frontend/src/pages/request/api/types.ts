import { z } from "zod";

export interface FoodRequest {
  id: number;
  status: string;
  userId: number;
  items: string[];
  quantities: number[];
  requestDate: Date;
  approvedBy: number | null;
}

export const getRequestsQueryParamsSchema = z.object({
  userId: z.string().optional(),
  status: z.string().optional(),
  requestType: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  includeDetails: z.boolean().optional().default(true),
  includeUser: z.boolean().optional().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type GetRequestsQueryParams = z.infer<
  typeof getRequestsQueryParamsSchema
>;

const requestDetailsSchema = z.array(
  z.object({
    requestId: z.string(),
    inventoryId: z.string(),
    quantity: z.number(),
    id: z.string(),
  })
);

const requestedBySchema = z.object({
  username: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
  isVerified: z.boolean(),
  isBanned: z.boolean(),
  createdBy: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  id: z.string(),
});

const requestDataSchema = z.object({
  requestedBy: requestedBySchema,
  requestType: z.string(),
  status: z.string(),
  notes: z.string(),
  dateRequested: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  requestDetails: requestDetailsSchema,
  id: z.string(),
});

export const getRequestsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(requestDataSchema),
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
});

export type RequestData = z.infer<typeof requestDataSchema>;
export type Requests = z.infer<typeof getRequestsResponseSchema>;

export type Request = {
  supplierId: number;
  category: string;
  subcategory: string;
  quantity: number;
  unit: string;
  status: string;
  requestDate: Date;
};

export const insertFoodRequestSchema = z.object({
  requestType: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  requestedBy: z.string().optional(),
  requestedByName: z.string().optional(),
  notes: z.string().optional(),
  requestDetails: z.array(
    z.object({
      category: z.string(),
      subCategory: z.string(),
      quantity: z.number(),
      unit: z.string().optional(),
      inventoryId: z.string(),
    })
  ),
});

export type InsertFoodRequest = z.infer<typeof insertFoodRequestSchema>;

const UpdateRequestSchema = z.object({
  status: z.string()
});

export type UpdateRequest = z.infer<typeof UpdateRequestSchema>;