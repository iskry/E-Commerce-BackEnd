const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  console.log('get / categories')
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  console.log('get /:id categories')
  Category.findOne({
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
});

router.post('/', (req, res) => {
  console.log('post / categories')
  Category.create({
    category_name: req.body.category_name
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);


  })
});

router.put('/:id', (req, res) => {
  console.log('put /:id categories')
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
console.log('delete /:id categories')
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((category) => res.json(category))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
