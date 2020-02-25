const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("user_table").select("id", "user", "password");
}

function add(user) {
  return db("user_table")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findBy(filter) {
  return db("user_table")
    .select("id", "user", "password")
    .where({ user: filter });
}

function findById(id) {
  return db("user_table")
    .select("id", "user")
    .where({ id })
    .first();
}
