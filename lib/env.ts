import { z } from "zod"

const envSchema = z.object({
  NEWS_API_KEY: z.string().min(1, "NEWS_API_KEY is required"),
  NEXT_PUBLIC_BASE_URL: z
    .string()
    .url("NEXT_PUBLIC_BASE_URL must be a valid URL")
    .default("http://localhost:3000"),
})

/** Validates and returns typed environment variables */
function validateEnv() {
  const parsed = envSchema.safeParse({
    NEWS_API_KEY: process.env.NEWS_API_KEY,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  })

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors)
    
    if (process.env.NODE_ENV === "development") {
      throw new Error("Invalid environment variables")
    }
    
    return {
      NEWS_API_KEY: process.env.NEWS_API_KEY || "",
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    }
  }

  return parsed.data
}

export const env = validateEnv()
export type Env = z.infer<typeof envSchema>
