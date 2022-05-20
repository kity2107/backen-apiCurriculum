const engine = process.env.DB_ENGINE || null;
//va a tomar la ruta deacuerdo a como haya setiado el .env
const pathModel = engine === 'mysql' ? './sql' : './nosql';

const models = {
  usuarioModel: require(`${pathModel}/usuario`),
  storageModel: require(`${pathModel}/storage`),
  curriculumModel: require(`${pathModel}/curriculum`),
};

module.exports = models;
