exports.up = knex => knex.schema.createTable("user_locations", t => {
  t.bigInteger("user_id").notNullable();
  t.bigInteger("location_id").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.datetime("updated_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.unique(["location_id", "user_id"], "index_user_locations_on_location_id_and_user_id")
  t.index("user_id", "index_user_locations_on_user_id")
});

exports.down = knex => knex.schema.dropTableIfExists("user_locations");