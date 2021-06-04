import { Knex } from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_locations', (t: Knex.TableBuilder) => {
    t.bigInteger('user_id').notNullable()
    t.bigInteger('location_id').notNullable()
    t.dateTime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.unique(['location_id', 'user_id'], 'index_user_locations_on_location_id_and_user_id')
    t.index('user_id', 'index_user_locations_on_user_id')
  })
}
export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('user_locations')
}
