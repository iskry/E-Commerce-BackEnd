const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => res.json(`Tag ${tag.tag_name} was created successfully with id: ${tag.id}`))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.json(`Tag updated successfully`))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.json(`Tag ${req.params.id} deleted successfully`))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
