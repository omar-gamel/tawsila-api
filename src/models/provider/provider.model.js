const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseI18n = require('mongoose-i18n-localize');

const ProviderSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      ref: 'user',
      required: true,
    },
    transferFees: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE'],
      default: 'MALE',
    },
    rating: {
      type: Number,
      default: 0,
    },
    busy: {
      type: Boolean,
      default: false,
    },
    recieveNotifications: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

ProviderSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.deleted;
    delete ret.__v;
    delete ret._id;
  },
});

let MODEL_NAME = 'provider';

ProviderSchema.plugin(autoIncrement.plugin, { model: MODEL_NAME, startAt: 1 });
ProviderSchema.plugin(mongooseI18n, { locales: ['ar', 'en'] });

module.exports = mongoose.model(MODEL_NAME, ProviderSchema);
