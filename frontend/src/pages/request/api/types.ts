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
  status: z.string().optional(),
  requestType: z.string().optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  includeDetails: z.boolean().optional().default(true),
  includeUser: z.boolean().optional().default(true),
});

export type GetRequestsQueryParams = z.infer<
  typeof getRequestsQueryParamsSchema
>;

export const getRequestsResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      requestedBy: z.string(),
      requestType: z.string(),
      status: z.string(),
      notes: z.string(),
      dateRequested: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      id: z.string(),
    })
  ),
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
});

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
  type: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  organizationName: z.string().optional(),
  supplierId: z.number().optional(),
  contactPerson: z.string().optional(),
  details: z.array(
    z.object({
      category: z.string(),
      subCategory: z.string(),
      quantity: z.number(),
      unit: z.string().optional(),
    })
  ),
});

export type InsertFoodRequest = z.infer<typeof insertFoodRequestSchema>;

export const getSuppliersResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

export type Suppliers = z.infer<typeof getSuppliersResponseSchema>;
