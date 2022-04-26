const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags
router.get('/', (req, res) => {
 Tag.findAll({
    // be sure to include its associated Product data
   include: [
    {
      model: Product,
      through: ProductTag,
    },
   ],
 })
 .then((tags) => res.status(200).json(tags))
 .catch((err) => res.status(500).json(err));
 
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
 Tag.findOne({
   where: {
     id: req.params.id,
   },
    // be sure to include its associated Product data
   include: [
     {
       model: Product,
       through: ProductTag,
     },
   ],
 }) 
 .then((tags) => res.status(200).json(tags))
 .catch((err) => res.status(400).json(err)); 
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag) => res.json(tag))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      }
    }
  )
  .then((tag) => {
    if(!tag) {
      res.status(404).json({message: "No tags found with this id"});
      return;
    }
    res.json(tag);
    })
    .catch((err) => {
console.log(err);
res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body,
    {
      where: {
        id: req.params.id,
      }
    }
  )
  .then((tag) => {
    if(!tag) {
      res.status(404).json({message: "No tags found with this id"});
      return;
    }
    res.json(tag);
    })
    .catch((err) => {
console.log(err);
res.status(500).json(err);
    });
});
  


module.exports = router;