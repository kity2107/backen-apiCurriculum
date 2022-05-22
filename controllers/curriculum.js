const { curriculumModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');

const getItems = async (req, res) => {
  try {
    //este req.user lo inyectamos en session.js
    const user = req.user;
    const data = await curriculumModel.find({});
    res.send({ data, user });
  } catch (error) {
    handleHttpError(res, 'Error en getItems');
  }
};

const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await curriculumModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en getItem');
  }
};

const createItem = async (req, res) => {
  try {
    //con la funcion **matchedData limpiamos lo q puede venir de mas en el body(controlando contra el validators)

    const body = matchedData(req);
    const data = await curriculumModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en createItem');
  }
};

const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    console.log(id, body);
    const data = await curriculumModel.findOneAndUpdate(id, body);
    res.send({ body });
  } catch (error) {
    handleHttpError(res, 'Error en updateItem');
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    //elimino el campo donde _id=id
    const data = await curriculumModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en deleteItem');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
