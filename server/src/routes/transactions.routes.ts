import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../../database'
import { checkIfExistsSessionId } from '../middlewares/check-if-exists-session-id'

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
				amount: type === 'income' ? amount : amount * -1,
				type,
				category,
				session_id: sessionId,
			})
			.returning('*')

		return reply.status(201).send()
	})

	app.get('/', { preHandler: [checkIfExistsSessionId] }, async () => {
		const transactions = await knex('transactions').select('*')
		return { transactions }
	})

	app.get(
		'/:id',
		{ preHandler: [checkIfExistsSessionId] },
		async (request, reply) => {
			const getTransactionsParamSchema = z.object({
				id: z.string(),
			})

			const { id } = getTransactionsParamSchema.parse(request.params)

			const transactionById = await knex('transactions').where({ id }).first()

			return reply.status(200).send(transactionById)
		},
	)

	app.get('/summary', { preHandler: [checkIfExistsSessionId] }, async () => {
		const summary = await knex('transactions')
			.sum('amount', { as: 'amount' })
			.first()

		// const summary = await knex('transactions')
		// 	.sum('amount', { as: 'amount' })
		// 	.first()

		return { summary }
	})

	app.delete(
		'/:id',
		{ preHandler: [checkIfExistsSessionId] },
		async (request, reply) => {
			const deleteTransactionSchema = z.object({
				id: z.string(),
			})

			const { id } = deleteTransactionSchema.parse(request.params)

			await knex('transactions').where({ id }).del()

			return reply.status(204).send()
		},
	)
}
