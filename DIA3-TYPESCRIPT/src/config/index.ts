import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().default('3000'),
    MONGO_URI: z.string().min(1, {
        message: 'MONGO_URI es requerido - agregen mongodb://... al .env'
    }),
    JWT_SECRET: z.string().min(8, {
        message: 'JWT_SECRET debe tener al menos 8 caracteres'
    }),

})

const env = envSchema.parse(process.env);

export const config = {
    port: Number(env.PORT), // string → number
    mongoUri: env.MONGO_URI,  // string garantizado
    jwtSecret: env.JWT_SECRET, // string garantizado
} as const; // as const hace los valores readonly
