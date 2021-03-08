exports.up = knex => knex.schema.createTable("user_companies", t => {
  t.bigInteger("user_id").notNullable();
  t.bigInteger("company_id").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.unique(["company_id", "user_id"], "index_user_companies_on_company_id_and_user_id")
  t.index(["user_id"], "index_user_companies_on_user_id")
});

exports.down = knex => knex.schema.dropTableIfExists("user_companies");
