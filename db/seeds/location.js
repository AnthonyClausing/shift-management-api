exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function () {
      // Inserts seed entries
      return knex('location').insert([
        {id: 1, company_id: 1, name: "Best Test Electronics Super Store", formatted_address:"321 West Avenue Brooklyn, NY 11224", display_address:"321 West Avenue", country_code: "001", state: "NY", county: "Brooklyn"},
        {id: 2, company_id: 2, name: "Target Testers Super Store", formatted_address:"321 E 12th St New York, NY 10003", display_address:"321 E 12th St", country_code: "001", state: "NY", county: "New York"},
      ]);
    });
};
