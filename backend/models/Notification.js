const mongoose = require('mongoose')


const NotificationSchema = new Schema({

  targetUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  targetRoles: [{ type: String }],
  type: {
    type: String,
    enum: ['info', 'warning', 'alert', 'success', 'error'],
    default: 'info'
  },
  message: { type: String, required: true },
  context: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});


module.exports = mongoose.model('Notification', NotificationSchema);
