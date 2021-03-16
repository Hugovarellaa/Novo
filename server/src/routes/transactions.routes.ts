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

		let sessionId = request.cookies.sessionId

		if (!sessionId) {
			sessionId = randomUUID()

			reply.cookie('sessionId', sessionId, {
				path: '/',
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
			})
		}

		const { title, amount, type, category } = createTransactionSchema.parse(
			request.body,
		)

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

	app.get('/', { preHandler: [checkIfExistsSessionId] }, async (request) => {
		const { sessionId } = request.cookies

		const transactions = await knex('transactions')
			.where({ session_id: sessionId })
			.select('*')
		return { transactions }
	})

	app.get(
		'/:id',
		{ preHandler: [checkIfExistsSessionId] },
		async (request, reply) => {
			const { sessionId } = request.cookies

			const getTransactionsParamSchema = z.object({
				id: z.string(),
			})

			const { id } = getTransactionsParamSchema.parse(request.params)

			const transactionById = await knex('transactions')
				.where({ id, session_id: sessionId })
				.first()

			return reply.status(200).send(transactionById)
		},
	)

	app.get(
		'/summary',
		{ preHandler: [checkIfExistsSessionId] },
		async (request) => {
			const { sessionId } = request.cookies

			const summary = await knex('transactions')
				.where({ session_id: sessionId })
				.sum('amount', { as: 'amount' })
				.first()

			return { summary }
		},
	)

	app.delete(
		'/:id',
		{ preHandler: [checkIfExistsSessionId] },
		async (request, reply) => {
			const { sessionId } = request.cookies

			const deleteTransactionSchema = z.object({
				id: z.string(),
			})

			const { id } = deleteTransactionSchema.parse(request.params)

			await knex('transactions')
				.where({ session_id: sessionId })
				.andWhere({ id })
				.del()

			return reply.status(204).send()
		},
	)
}
