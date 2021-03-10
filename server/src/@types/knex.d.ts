import { Knex } from 'knex'

declare module 'knex/types/tables' {
	interface Transaction {
		id: string
		title: string
		amount: number
		category: string
		type: 'income' | 'outcome'
		created_at: string
		session_id?: string
	}

	interface Tables {
		transactions: Transaction
	}
}
