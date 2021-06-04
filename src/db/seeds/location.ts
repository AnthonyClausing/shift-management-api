import { Knex } from 'knex'

exports.seed = (knex: Knex) => seed(knex)

async function seed(knex: Knex) {
  return knex('location').truncate()
    .then(function () {
      return knex('location').insert([
        {company_id: 1, name: "Best Test Electronics Super Store", formatted_address:"321 West Avenue Brooklyn, NY 11224", display_address:"321 West Avenue", country_code: "001", state: "NY", county: "Brooklyn"},
        {company_id: 2, name: "Target Testers Super Store", formatted_address:"321 E 12th St New York, NY 10003", display_address:"321 E 12th St", country_code: "001", state: "NY", county: "New York"},
      ])
    })
}
