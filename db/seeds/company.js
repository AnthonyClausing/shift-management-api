exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('company').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('company').insert([
        {name: 'Best Test Electronics'},
        {name: 'Target Testers'}
      ]);
    });
};
