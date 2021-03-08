exports.up = knex =>knex.schema.createTable("user", t => {
  t.increments();
  t.bigInteger("company_id").notNullable();
  t.string("email").notNullable();
  t.string("password_digest").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.string("first_name").notNullable();
  t.string("last_name").notNullable();
  t.string("phone");
  t.string("reset_password_token");
  t.datetime("reset_password_sent_at");
  t.index("company_id", "index_users_on_company_id");
});

exports.down = knex => knex.schema.dropTableIfExists("user");
