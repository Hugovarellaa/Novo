import { execSync } from 'child_process'
import request from 'supertest'
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from 'vitest'
import { app } from '../src/app'

describe('Transaction Routes', () => {
	beforeAll(async () => {
		await app.ready()
	})

	beforeEach(async () => {
		execSync('npm run knex migrate:latest')
	})

	afterEach(async () => {
		execSync('npm run knex migrate:rollback --all')
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able create a new transaction', async () => {
		const response = await request(app.server).post('/transactions').send({
			title: 'Transaction test',
			amount: 3000,
			type: 'income',
			category: 'Category Test',
		})

		expect(response.statusCode).toBe(201)
	})

	it('should be able a list all transactions', async () => {
		const createTransaction = await request(app.server)
			.post('/transactions')
			.send({
				title: 'Transaction test',
				amount: 3000,
				type: 'income',
				category: 'Category Test',
			})

		// console.log(createTransaction.headers['set-cookie']) -> forma de buscar os cookies
		// console.log(response.get('Set-Cookie')) -> forma de buscar os cookies

		const cookies = createTransaction.get('Set-Cookie')

		const ListAllTransactions = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies)

		expect(ListAllTransactions.body.transactions).toEqual([
			expect.objectContaining({
				id: expect.any(String),
				title: 'Transaction test',
				amount: 3000,
				category: 'Category Test',
				type: 'income',
				created_at: expect.any(String),
				session_id: expect.any(String),
			}),
		])
	})

	it('should be able to get specific transaction', async () => {
		const createTransaction = await request(app.server)
			.post('/transactions')
			.send({
				title: 'Transaction test',
				amount: 3000,
				type: 'income',
				category: 'Category Test',
			})

		// console.log(createTransaction.headers['set-cookie']) -> forma de buscar os cookies
		// console.log(response.get('Set-Cookie')) -> forma de buscar os cookies

		const cookies = createTransaction.get('Set-Cookie')

		const ListAllTransactions = await request(app.server)
			.get('/transactions')
			.set('Cookie', cookies)

		const transactionId = ListAllTransactions.body.transactions[0].id

		const getTransaction = await request(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies)

		expect(getTransaction.statusCode).toEqual(200)
		expect(getTransaction.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				title: 'Transaction test',
				amount: 3000,
				category: 'Category Test',
				type: 'income',
				created_at: expect.any(String),
				session_id: expect.any(String),
			}),
		)
	})

	it.only('should be able to get the summary', async () => {
		const createTransaction = await request(app.server)
			.post('/transactions')
			.send({
				title: 'Transaction Income Test',
				amount: 3000,
				type: 'income',
				category: 'Category Test',
			})

		await request(app.server).post('/transactions').send({
			title: 'Transaction Outcome Test',
			amount: 1850,
			type: 'outcome',
			category: 'Category Test',
		})

		const cookies = createTransaction.get('Set-Cookie')

		const summaryResponse = await request(app.server)
			.get('/transactions/summary')
			.set('Cookie', cookies)

		expect(summaryResponse.body.summary).toEqual({
			amount: 3000,
		})
	})
})
