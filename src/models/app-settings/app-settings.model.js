const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const settingsSchema = new mongoose.Schema(
  {
    user: {
      type: Number,
      ref: 'user',
      required: true,
    },
    recieveUpdates: {
      type: Boolean,
      default: true,
    },
    kmPrice: {
      type: Number,
    },
    deliveryType: {
      type: String,
      enum: ['SINGLE', 'MULTI'],
    },
  },
  { timestamps: true }
);

let MODEL_NAME = 'app-settings';

settingsSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.deleted;
    delete ret.__v;
  },
});

settingsSchema.plugin(autoIncrement.plugin, { model: MODEL_NAME, startAt: 1 });

module.exports = mongoose.model(MODEL_NAME, settingsSchema);
