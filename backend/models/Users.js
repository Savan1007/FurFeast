const mongoose = require('mongoose');
const Role = require('./Roles');
const UserDetailsSchema = require('./UserDetails');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: false },
  email:    { type: String, unique: true, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  refreshTokenExpiry: { type: Date },
  emailVerificationToken: { type: String },
  emailVerificationTokenExpiry: { type: Date },
  passwordResetToken: { type: String },
  passwordResetTokenExpiry: { type: Date },
  lastLogin: { type: Date },
  roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
  isVerified: { type: Boolean, default: false }, 
  isBanned: { type: Boolean, default: false }, 
  userDetails: UserDetailsSchema,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true,
  // toObject: {
  //   virtuals: true,
  //   versionKey: false,
  //   transform: function (doc, ret) {
  //     ret.id = ret._id;
  //     delete ret._id;
  //     delete ret.password;
  //     delete ret.refreshToken;
  //     delete ret.emailVerificationToken;
  //     delete ret.passwordResetToken;
  //   }
  // },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.refreshToken;
      delete ret.emailVerificationToken;
      delete ret.passwordResetToken;
    }
  }
 });

module.exports = mongoose.model('User', UserSchema);
