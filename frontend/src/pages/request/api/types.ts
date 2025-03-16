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

export const getRequestsResponseSchema = z.object({
  data: z.array(
    z.object({
      supplier_id: z.number(),
      donation_category: z.string(),
      food_type: z.string(),
      food_form: z.string(),
      quantity: z.number(),
      unit: z.string(),
      status: z.string(),
      createdAt: z.string(),
    }).transform(({ supplier_id, donation_category, food_type, food_form, quantity, unit, status, createdAt }) => ({
      supplierId: supplier_id,
      category: donation_category,
      subcategory: `${food_type} ${food_form} food`,
      quantity,
      unit,
      status,
      requestDate: new Date(createdAt),
    }))
  ),
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
}

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
