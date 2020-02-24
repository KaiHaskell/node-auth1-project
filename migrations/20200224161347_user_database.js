exports.up = async function(knex) {
  await knex.schema.createTable("user_table", tbl => {
    tbl.increments();
    tbl
      .string("user", 20)
      .notNullable()
      .unique();
    tbl.string("password", 128).notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("user_table");
};
