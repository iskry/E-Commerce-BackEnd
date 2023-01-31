const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) =>
      res.json(
        `Category ${category.category_name} was created successfully with id: ${category.id}`
      )
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) =>
      res.json(`Category ${req.params.id} updated successfully`)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return Category.destroy({
        where: {
          id: req.params.id,
        },
      });
    })
    .then(() => {
      res.json(`Category ${req.params.id} has been deleted`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
