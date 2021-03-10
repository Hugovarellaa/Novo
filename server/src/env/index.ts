import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	DATABASE_URL: z.string(),
	PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('❌❌ Environment variable not found ❌❌', _env.error.format())
	throw new Error('Environment variable not found')
}

export const env = _env.data
