const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');
// const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2');
const mongoseDelete = require('mongoose-delete');

const CurriculumScheme = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
    },
    linkedin: {
      type: String,
    },
    estudios: {
      nivelEstudio: {
        type: String,
      },
      estado: {
        type: String,
      },
      titulo: {
        type: String,
      },
    },
    cursos: {
      nombre: {
        type: String,
      },
      estado: {
        type: String,
      },
    },
    experiencia: {
      trabajo: {
        type: String,
      },
      tareas: {
        type: String,
      },
      referencia: {
        type: String,
      },
    },
    relId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true, //nos da la fecha de creacion y fecha de actualizacion de mongo
    versionKey: false,
  }
);
// UserScheme.index({ email: 1 });
// UserScheme.plugin(mongoosePaginate);
// UserScheme.plugin(mongoosePaginateAggregate);
//nos hace un borrado logico de la base de datos
CurriculumScheme.plugin(mongoseDelete, {
  overrideMethods: 'all',
});
module.exports = mongoose.model('curriculum', CurriculumScheme);
