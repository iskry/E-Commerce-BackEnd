const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  console.log('get / tags')
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
  console.log('get /:id tags')
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
  console.log('post / tags')
  Tag.create(req.body)
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  console.log('put /:id tags')
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  console.log('delete /:id tags')
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
