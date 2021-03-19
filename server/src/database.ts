import { Knex, knex as knexSetup } from 'knex'
import { env } from '../src/env'

const knexConfig: Knex.Config = {
	client: 'sqlite3',
	connection:
		env.DATABASE_CLIENT === 'sqlite'
			? {
					filename: env.DATABASE_URL,
			  }
			: env.DATABASE_CLIENT,

	useNullAsDefault: true,

	migrations: {
		extension: 'ts',
		directory: './database/migrations',
	},
}

const knex: Knex = knexSetup(knexConfig)

export { knex, knexConfig }
