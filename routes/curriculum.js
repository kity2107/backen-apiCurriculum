const express = require('express');
const router = express.Router();
const customHeader = require('../middleware/customHeader');
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/curriculum');
const {
  validacionCreateItem,
  validacionGetItem,
} = require('../validators/curriculum');
//listar
router.get('/', getItems);
//obtener un detalle
router.get('/:id', validacionGetItem, getItem);
//crear un registro
router.post('/', validacionCreateItem, createItem);
//actualizar un registro
router.put('/:id', validacionGetItem, validacionCreateItem, updateItem);
//eliminar un registro
router.delete('/:id', validacionGetItem, deleteItem);
module.exports = router;
