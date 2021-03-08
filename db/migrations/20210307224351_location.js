exports.up = knex => knex.schema.createTable("location", t => {
  t.increments();
  t.bigInteger("company_id").notNullable()
  t.text("name")
  t.text("formatted_address").notNullable();
  t.text("display_address").notNullable();
  t.text("country_code").notNullable();
  t.text("state").notNullable();
  t.text("county").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.unique("company_id", "index_locations_on_company_id")
});

exports.down = knex => knex.schema.dropTableIfExists("location");
