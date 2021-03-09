// Versão web - Título , Preço, Categoria, Data, Type (Entrada / Saída)
// Versão mobile - Título , Preço, Categoria, Data, Type (Entrada / Saída)

import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('transactions', (table) => {
		table.uuid('id').primary().notNullable()
		table.text('title').notNullable()
		table.decimal('amount').notNullable()
		table.text('category').notNullable()
		table.enum('type', ['income', 'outcome']).notNullable()
		table.timestamp('created_at').defaultTo(knex.fn.now())
	})
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('transactions')
}
