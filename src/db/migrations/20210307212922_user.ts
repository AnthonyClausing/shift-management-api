import { Knex } from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (t: Knex.TableBuilder) => {
    t.increments('id').primary()
    t.bigInteger('company_id').notNullable()
    t.string('email').notNullable()
    t.string('password_digest').notNullable()
    t.dateTime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.string('first_name').notNullable()
    t.string('last_name').notNullable()
    t.string('phone')
    t.string('auth_token')
    t.string('reset_password_token')
    t.dateTime('reset_password_sent_at')
    t.index('company_id', 'index_users_on_company_id')
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('user')
}
