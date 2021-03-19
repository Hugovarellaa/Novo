import { Knex, knex as knexSetup } from 'knex'
import { env } from './env'

const knexConfig: Knex.Config = {
	client: env.DATABASE_CLIENT,
	connection:
		env.DATABASE_CLIENT === 'sqlite'
			? {
					filename: env.DATABASE_URL,
			  }
			: env.DATABASE_URL,

	useNullAsDefault: true,

	migrations: {
		extension: 'ts',
		directory: './database/migrations',
	},
}

const knex: Knex = knexSetup(knexConfig)

export { knex, knexConfig }
