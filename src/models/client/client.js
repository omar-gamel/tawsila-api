const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseI18n = require('mongoose-i18n-localize');

const ClientSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      ref: 'user',
      required: true,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

let MODEL_NAME = 'client';

ClientSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.deleted;
    delete ret.__v;
    delete ret._id;
  },
});

ClientSchema.plugin(autoIncrement.plugin, { model: MODEL_NAME, startAt: 1 });
ClientSchema.plugin(mongooseI18n, { locales: ['ar', 'en'] });

module.exports = mongoose.model(MODEL_NAME, ClientSchema);
