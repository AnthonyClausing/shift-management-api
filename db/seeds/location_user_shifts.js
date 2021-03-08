exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('location_user_shifts').del()
    .then(function () {
      // Inserts seed entries
      return knex('location_user_shifts').insert([
        {user_id: 4, location_id: 1, day: 14, month: 3, year: 2021, start_at: "09:00:00", end_at: "17:00:00"},
      ]);
    });
};
