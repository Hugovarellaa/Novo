import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../src/app'

describe('Transaction Routes', () => {
	beforeAll(async () => {
		app.ready()
	})
	afterAll(async () => {
		app.close()
	})

	it('should be able create a new transaction', async () => {
		const createTransaction = await request(app.server)
			.post('/transactions')
			.send({
				title: 'Transaction test',
				amount: 3000,
				type: 'income',
				category: 'Category Test',
			})

		expect(createTransaction.statusCode).toBe(201)
	})
})
