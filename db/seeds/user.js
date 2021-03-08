exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, company_id: 1, email:"owner@besttest.com", password_digest: "test123", first_name: "OwnerOf", last_name: "BestTest", phone: "347-555-1234"},
        {id: 2, company_id: 2, email: "owner@targettesters.com", password_digest: "testtest", first_name: "OwnerOf", last_name: "TargetTesters", phone: "347-555-2345"},
        {id: 3, company_id: 1, email: "manager@besttest.com", password_digest: "manager123", first_name: "ManagerOf", last_name: "BestTest", phone: "347-555-3456"},
        {id: 4, company_id: 1, email: "employee@besttest.com", password_digest: "employee123", first_name: "EmployeeOf", last_name: "BestTest", phone: "347-555-4567"},
      ]);
    });
};
