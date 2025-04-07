import { Phone } from "lucide-react";
import { z } from "zod";

const RoleSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
}));

export const getAllRolesSchema = z.object({
  success: z.boolean(),
  data: RoleSchema,
  total: z.number(),
});

export type Roles = z.infer<typeof RoleSchema>;
export type GetAllRoles = z.infer<typeof getAllRolesSchema>;

export const insertNewUserSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
  confirmPassword: z.string().nonempty("Retype password is required"),
  roles: z.array(z.string()).nonempty("At least one role is required"),
  userDetails: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
  }).optional(),
});

export type InsertUser = z.infer<typeof insertNewUserSchema>;

export const getAllUsersQueryParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  email: z.string().optional(),
  username: z.string().optional(),
  isVerified: z.boolean().optional(),
  isBanned: z.boolean().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  role: z.string().optional(),
});

export type GetAllUsersQueryParams = z.infer<
  typeof getAllUsersQueryParamsSchema
>;

export const userRoleSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  permissions: z.array(z.string()),
  __v: z.number(),
});

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  roles: z.array(userRoleSchema),
  isVerified: z.boolean(),
  isBanned: z.boolean(),
  createdBy: z.string().nullable(),
  emailVerificationToken: z.string(),
  emailVerificationTokenExpiry: z.string(),
  userDetails: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
  }).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  __v: z.number(),
});

export const getAllUsersResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(userSchema),
  total: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type GetAllUsersResponse = z.infer<typeof getAllUsersResponseSchema>;

export const userExistsResponseSchema = z.object({
  success: z.boolean(),
  exists: z.boolean(),
});
export type UserExistsResponse = z.infer<typeof userExistsResponseSchema>;
