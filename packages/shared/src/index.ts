import { z } from "zod";

export const ErrorCodeSchema = z.enum([
  "UNAUTHORIZED",
  "LIMIT_REACHED",
  "INVALID_IMAGE",
  "MODEL_ERROR"
]);

export const IdentifyPartResponseSchema = z.object({
  success: z.boolean(),
  partName: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  code: ErrorCodeSchema.optional(),
  message: z.string().optional()
});

export type IdentifyPartResponse = z.infer<typeof IdentifyPartResponseSchema>;
