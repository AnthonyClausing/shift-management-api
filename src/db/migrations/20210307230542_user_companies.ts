import {Knex} from 'knex'

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user_companies', (t: Knex.TableBuilder) => {
    t.bigInteger("user_id").notNullable()
    t.bigInteger("company_id").notNullable()
    t.dateTime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.dateTime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable()
    t.unique(["company_id", "user_id"], "index_user_companies_on_company_id_and_user_id")
    t.index(["user_id"], "index_user_companies_on_user_id")
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('user_companies')
}

