import { z } from "zod";

export const ErrorCodeSchema = z.enum([
  "UNAUTHORIZED",
  "LIMIT_REACHED",
  "INVALID_IMAGE",
  "MODEL_ERROR"
]);

const VehicleSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.string(),
  engine: z.string().optional(),
  partLocation: z.string().optional()
});

const RetailerLinksSchema = z.object({
  amazon: z.string().url(),
  ebay: z.string().url(),
  rockauto: z.string().url()
});

const PartCandidateSchema = z.object({
  id: z.string(),
  commonName: z.string(),
  technicalName: z.string(),
  confidence: z.number().min(0).max(1),
  symptoms: z.array(z.string()),
  oemPartNumbers: z.array(z.string()),
  aftermarketEquivalents: z.array(z.string()),
  priceRange: z.string(),
  searchQuery: z.string(),
  questions: z.array(z.string()).optional(),
  retailerLinks: RetailerLinksSchema
});

export const IdentifyPartResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    analysisId: z.string(),
    vehicle: VehicleSchema,
    topCandidate: PartCandidateSchema,
    candidates: z.array(PartCandidateSchema).min(1)
  }),
  z.object({
    success: z.literal(false),
    code: ErrorCodeSchema.optional(),
    message: z.string().optional()
  })
]);

export type IdentifyPartResponse = z.infer<typeof IdentifyPartResponseSchema>;
