import {Knex} from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('password_resets', (t: Knex.TableBuilder) => {
    t.bigInteger("user_id").notNullable()
    t.string("token").notNullable()
    t.dateTime("sent_at").notNullable()
    t.dateTime("expires_at").notNullable()
    t.dateTime("used_at")
    t.dateTime("deactivated_at")
    t.dateTime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.unique(["token"], "index_password_resets_on_token")
    t.index("user_id","index_password_resets_on_user_id")
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('password_resets')
}