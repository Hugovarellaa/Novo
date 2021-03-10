import fastify from 'fastify'
import { knex } from '../database'

const app = fastify()

app.get('/', async () => {
	const database = await knex('sqlite_schema').select('*')

	return { database }
})

export { app }
