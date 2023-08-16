const router = require("express").Router();
const { Category, Product, ProductTag, Tag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );
    if (categoryData == 1) {
      res.status(200).json({ message: "Successfully updated" });
    } else {
      res.status(400).json({ message: "Update failed" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id" });
      return;
    }
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
