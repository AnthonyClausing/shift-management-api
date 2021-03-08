exports.up = knex => knex.schema.createTable("user_roles", t => {
  t.bigInteger("user_id").notNullable();
  t.string("role").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.index(["role", "user_id"])
  t.index("user_id","index_user_roles_on_user_id")
});

exports.down = knex => knex.schema.dropTableIfExists("user_roles");
