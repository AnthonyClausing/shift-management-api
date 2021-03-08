exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_locations').insert([
        {user_id: 1, location_id: 1},
        {user_id: 2, location_id: 2},
        {user_id: 3, location_id: 1},
        {user_id: 4, location_id: 1},
      ]);
    });
};
