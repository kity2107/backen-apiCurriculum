const fs = require('fs');
const { matchedData } = require('express-validator');
const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const public_url = process.env.URL_PUBLIC;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en storage listItems');
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en storage getItem');
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${public_url}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (error) {
    handleError(res, 'Error en createItem');
  }
};

const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const id = req.id;
    const findMedia = await storageModel.findById(id);
    const fileName = findMedia.filename;
    //elimino de la base de datos
    await storageModel.delete({ _id: id });
    //con esto le indico a node q vamos a eliminar el archivo
    //fs.unlinkSync(`${MEDIA_PATH}/${fileName}`); // si habilito la linea se elimina la hubicacion  real del archivo c:/miproyect/fil-xxx y en la base

    const data = {
      findMedia: fileName,
      deleted: true,
    };

    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'Error en storage deleteItem');
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
