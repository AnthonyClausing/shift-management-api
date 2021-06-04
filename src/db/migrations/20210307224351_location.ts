import { Knex } from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('location', (t: Knex.TableBuilder) => {
    t.increments('id').primary()
    t.bigInteger('company_id').notNullable()
    t.text('name')
    t.text('formatted_address').notNullable()
    t.text('display_address').notNullable()
    t.text('country_code').notNullable()
    t.text('state').notNullable()
    t.text('county').notNullable()
    t.dateTime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.unique(['company_id'], 'index_locations_on_company_id')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('location')
}
