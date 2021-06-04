import {Knex} from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('company', (t: Knex.TableBuilder) => {
    t.increments('id').primary()
    t.text('name').notNullable()
    t.dateTime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('company')
}
