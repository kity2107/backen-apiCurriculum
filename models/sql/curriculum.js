const { sequelize } = require('../../config/mysql');
const { DataTypes } = require('sequelize');
const Curriculum = sequelize.define(
  'curriculums',
  {
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    linkedin: {
      type: DataTypes.STRING,
    },

    estudios_nivelEstudio: {
      type: DataTypes.STRING,
    },
    estudios_estado: {
      type: DataTypes.STRING,
    },
    estudios_titulo: {
      type: DataTypes.STRING,
    },

    cursos_nombre: {
      type: DataTypes.STRING,
    },
    cursos_estado: {
      type: DataTypes.STRING,
    },

    experiencia_trabajo: {
      type: DataTypes.STRING,
    },
    experiencia_tareas: {
      type: DataTypes.STRING,
    },
    experiencia_referencia: {
      type: DataTypes.STRING,
    },

    relId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true, //createupdate/ updateup
  }
);

module.exports = Curriculum;
