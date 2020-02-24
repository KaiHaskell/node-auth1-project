const db = require("../../data/dbConfig");

module.exports = {
  add,
  find,
  findById
};

function find() {
  return db("user_table").select("id", "username", "password");
}

function add(user) {
  return db("user_table")
    .insert(user, "id")
    .then(ids => {
      const [ids] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
