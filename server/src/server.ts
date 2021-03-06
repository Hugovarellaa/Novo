import fastify from 'fastify'
import { knex } from '../database'

const app = fastify()

app.get('/', async () => {
	const database = await knex('sqlite_schema').select('*')

	return { database }
})

const PORT = 3333

app
	.listen({
		port: PORT,
	})
	.then(() => console.log('🚀🚀 Server running in port 🚀🚀', PORT))
