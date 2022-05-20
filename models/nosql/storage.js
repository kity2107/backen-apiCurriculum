const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate-v2');
// const mongoosePaginateAggregate = require('mongoose-aggregate-paginate-v2');
const mongoseDelete = require('mongoose-delete');

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// StorageScheme.plugin(mongoosePaginate);
// StorageScheme.plugin(mongoosePaginateAggregate);
StorageScheme.plugin(mongoseDelete, {
  overrideMethods: 'all',
});
module.exports = mongoose.model('storage', StorageScheme);
