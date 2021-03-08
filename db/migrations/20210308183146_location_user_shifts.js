exports.up = knex => knex.schema.createTable("location_user_shifts", t => {
  t.bigInteger("user_id").notNullable();
  t.bigInteger("location_id").notNullable();
  t.integer("day").notNullable();
  t.integer("month").notNullable();
  t.integer("year").notNullable();
  t.time("clocked_in");
  t.time("clocked_out");
  t.time("start_at").notNullable();
  t.time("end_at").notNullable();
  t.datetime("created_at", { precision: 6 }).defaultTo(knex.fn.now(6)).notNullable();
  t.unique(["location_id", "user_id"], "index_location_user_shifts_on_location_id_and_user_id")
});

exports.down = knex => knex.schema.dropTableIfExists("location_user_shifts");