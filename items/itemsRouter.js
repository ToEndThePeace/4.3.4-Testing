const router = require("express").Router();
const Items = require("./itemsModel");

router.get("/", async (req, res) => {
  const items = await Items.find();
  res.status(200).json(items);
});
router.post("/", async (req, res) => {
  const response = await Items.insert(req.body);
  res.status(201).json(response);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Items.remove(id);
  res.status(204).end();
});

module.exports = router;
