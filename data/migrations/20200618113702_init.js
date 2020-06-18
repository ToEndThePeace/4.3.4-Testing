exports.up = function (knex) {
  return knex.schema.createTable("items", (t) => {
    t.increments();
    t.string("name", 256).notNullable().unique().index();
    t.integer("damage");
    t.integer("armor");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("items");
};
