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

	it.only('should be able create a new transaction', async () => {
		const response = await request(app.server).post('/transactions').send({
			title: 'Transaction test',
			amount: 3000,
			type: 'income',
			category: 'Category Test',
		})

		console.log(response.headers['set-cookie'])

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

		console.log(createTransaction.headers['set-cookie'])
		// console.log(response.get('Set-Cookie')) -> forma de buscar os cookies
	})
})
