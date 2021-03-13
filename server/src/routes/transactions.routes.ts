import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../../database'

export async function transactionsRoutes(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const createTransactionSchema = z.object({
			title: z.string(),
			amount: z.number(),
			category: z.string(),
			type: z.enum(['income', 'outcome']),
		})

		const { title, amount, type, category } = createTransactionSchema.parse(
			request.body,
		)

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = request.cookies.sessionId
		}

		await knex('transactions')
			.insert({
				id: randomUUID(),
				title,
				amount,
				type,
				category,
				session_id: sessionId,
			})
			.returning('*')

		return reply.status(201).send()
	})

	app.get('/', async () => {
		const transactions = await knex('transactions').select('*')
		return { transactions }
	})

	app.get('/:id', async (request, reply) => {
		const getTransactionsParamSchema = z.object({
			id: z.string(),
		})

		const { id } = getTransactionsParamSchema.parse(request.params)

		const transactionById = await knex('transactions').where({ id }).first()

		return reply.status(200).send(transactionById)
	})
}
