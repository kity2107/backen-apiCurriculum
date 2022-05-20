const express = require('express');
const {
  getItem,
  getItems,
  deleteItem,
  createItem,
} = require('../controllers/storage');
const uploadMiddleware = require('../utils/handleStorage');
const router = express.Router();
const { validacionGetItem } = require('../validators/storage');

//obtener lista de items
router.get('/', getItems);
//obtener detalle de item
router.get('/:id', validacionGetItem, getItem);
//eliminar item
router.delete('/:id', validacionGetItem, deleteItem);
//crear item
router.post('/', uploadMiddleware.single('myfile'), createItem);

module.exports = router;
