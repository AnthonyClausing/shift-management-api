
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_roles').insert([
        {user_id: 1, role: "owner"},
        {user_id: 2, role: "owner"},
        {user_id: 3, role: "manager"},
        {user_id: 4, role: "employee"}
      ]);
    });
};
