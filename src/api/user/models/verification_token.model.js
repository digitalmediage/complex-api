const mongoose = require('mongoose');

// helper
// eslint-disable-next-line prefer-destructuring
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * User Schema
 * @private
 */
const verificationTokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200,
  },
});

/**
 * @typedef Verification_token
 */
module.exports = mongoose.model('VerificationToken', verificationTokenSchema);
