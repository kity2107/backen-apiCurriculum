const express = require('express');
const router = express.Router();
const customHeader = require('../middleware/customHeader');
const authMiddleware = require('../middleware/session');
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
const checkRol = require('../middleware/rol');
//listar
router.get('/', authMiddleware, getItems);
//obtener un detalle
router.get('/:id', authMiddleware, validacionGetItem, getItem);
//crear un registro
router.post(
  '/',
  authMiddleware,
  checkRol(['admin']),
  validacionCreateItem,
  createItem
);
//actualizar un registro
router.put(
  '/:id',
  authMiddleware,
  validacionGetItem,

  validacionCreateItem,
  updateItem
);
//eliminar un registro
router.delete('/:id', authMiddleware, validacionGetItem, deleteItem);
module.exports = router;
