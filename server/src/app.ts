import cookies from '@fastify/cookie'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions.routes'

const app = fastify()

app.register(cors, {})
app.register(cookies)

app.register(transactionsRoutes, {
	prefix: 'transactions',
})

export { app }
