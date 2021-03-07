import { Knex, knex as knexSetup } from 'knex'

const knexConfig: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: './database/database-development.sqlite',
	},

	useNullAsDefault: true,

	migrations: {
		extension: 'ts',
		directory: './database/migrations',
	},
}

const knex: Knex = knexSetup(knexConfig)

export { knex, knexConfig }
