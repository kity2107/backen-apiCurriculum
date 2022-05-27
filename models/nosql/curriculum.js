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

//implementar metodo propio con relacion a storage
CurriculumScheme.statics.findAllData = function (name) {
  //this hace referencia al modelo
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages', //desde curriculum hago relacion con storage
        localField: 'relId', //voy a usar el campo relId
        foreignField: ':_id', //lo relaciono con el campo ._id
        as: 'reel', //todo se va a guardar en un alias q se va a llamar reel
      },
    },
  ]);
  return joinData;
};

CurriculumScheme.plugin(mongoseDelete, {
  overrideMethods: 'all',
});
module.exports = mongoose.model('curriculum', CurriculumScheme);
