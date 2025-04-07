import { z } from "zod";

// Define the InventoryItem schema
export const inventoryItemSchema = z.object({
  id: z.string(), // Unique identifier for the item
  itemName: z.string(), // Name of the inventory item
  quantity: z.number(), // Quantity of the item in stock
  unit: z.string(), // Unit of measurement for the item
  lowStockThreshold: z.number(), // Threshold for low stock
  itemType: z.string(), // Type/category of the item
});

export type InventoryItem = z.infer<typeof inventoryItemSchema>; // TypeScript type for an inventory item
export const inventoryItemsSchema = z.array(inventoryItemSchema).optional(); // Optional array of inventory items

// Define the InventoryApiResponse schema
export const inventoryApiResponseSchema = z.object({
  success: z.boolean(), // Indicates if the API request was successful
  message: z.string().optional(), // Optional message from the API
  data: inventoryItemsSchema,
  errorCode: z.string().optional(), // Optional error code (if the request failed)
});

// Infer TypeScript types from the schemas
export type InventoryItems = z.infer<typeof inventoryItemsSchema>;
export type InventoryApiResponse = z.infer<typeof inventoryApiResponseSchema>;

export const updateInventorySchema = z.object({
  itemName: z.string().optional(),
  quantity: z.number().optional(),
  unit: z.string().optional(),
  lowStockThreshold: z.number().optional(),
});

export type UpdateInventory = z.infer<typeof updateInventorySchema>;
