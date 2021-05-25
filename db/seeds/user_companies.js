exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_companies').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user_companies').insert([
        {user_id: 1, company_id: 1},
        {user_id: 2, company_id: 2},
        {user_id: 3, company_id: 1},
        {user_id: 4, company_id: 1}
      ]);
    });
};
