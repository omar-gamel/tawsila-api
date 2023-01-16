const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const notifictionSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const MODEL_NAME = 'notifications';

notifictionSchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});

module.exports = mongoose.model(MODEL_NAME, notifictionSchema);
