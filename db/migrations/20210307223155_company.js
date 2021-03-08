exports.up = knex => knex.schema.createTable("company", t => {
  t.increments();
  t.text("name").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
});

exports.down = knex => knex.schema.dropTableIfExists("company");
