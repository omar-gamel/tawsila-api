const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseI18n = require('mongoose-i18n-localize');

const FavoriteAssignmentSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      required: true,
    },
    client: {
      type: Number,
      ref: 'client',
    },
    provider: {
      type: Number,
      ref: 'provider',
    },
  },
  { timestamps: true }
);

FavoriteAssignmentSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.updatedAt;
    delete ret.deleted;
    delete ret._id;
    delete ret.__v;
  },
});

let MODEL_NAME = 'favorite-assignment';

FavoriteAssignmentSchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});
FavoriteAssignmentSchema.plugin(mongooseI18n, { locales: ['ar', 'en'] });

module.exports = mongoose.model(MODEL_NAME, FavoriteAssignmentSchema);
