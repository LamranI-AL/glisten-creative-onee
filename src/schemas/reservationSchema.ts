import { z } from "zod";
export const reservationSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Name must be at most 50 characters",
    }),
  phoneNumber: z
    .string()
    .min(1, {
      message: "Phone number is required",
    })
    .max(20, {
      message: "Phone number must be at most 20 characters",
    }),
});
