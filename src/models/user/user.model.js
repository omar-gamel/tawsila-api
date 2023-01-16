const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const mongooseI18n = require('mongoose-i18n-localize');

const passwordPattern =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*#_.-?&])[A-Za-z\\d$@$!%_*_#_.-?&]{8,}$';
const emailPattern =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const MODEL_NAME = 'user';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      i18n: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: [true, 'Duplicated Email'],
      pattern: emailPattern,
    },
    password: {
      type: String,
      required: true,
      pattern: passwordPattern,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.deleted;
    delete ret.password;
    delete ret.__v;
  },
});

userSchema.plugin(autoIncrement.plugin, { model: MODEL_NAME, startAt: 1 });
userSchema.plugin(mongooseI18n, { locales: ['ar', 'en'] });

module.exports = mongoose.model(MODEL_NAME, userSchema);
