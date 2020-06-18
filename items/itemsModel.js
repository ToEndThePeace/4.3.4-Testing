const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};
function find() {
  return db("items");
}
function findById(id) {
  return db("items").where({ id }).first();
}
async function insert(newItem) {
  const [id] = await db("items").insert(newItem, "id");
  return findById(id);
}
function update(id, changes) {
  return null;
}
function remove(id) {
  return null;
}
