exports.up = knex =>knex.schema.createTable("password_resets", t => {
  t.bigInteger("user_id").notNullable();
  t.string("token").notNullable();
  t.datetime("sent_at").notNullable()
  t.datetime("expires_at").notNullable()
  t.datetime("used_at")
  t.datetime("deactivated_at")
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.unique("token", "index_password_resets_on_token")
  t.index("user_id","index_password_resets_on_user_id")
});

exports.down = knex => knex.schema.dropTableIfExists("password_resets");
