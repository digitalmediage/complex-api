const httpStatus = require('http-status');
const {
  omit,
} = require('lodash');
const crypto = require('crypto');

// Utility
const transporter = require('./../../utils/mailHandler');
const APIError = require('../../utils/APIError');

// Models
const VerificationToken = require('./../models/verification_token.model');
const User = require('../models/user.model');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = {
      user
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
// exports.replace = async (req, res, next) => {
//   try {
//     const { user } = req.locals;
//     const newUser = new User(req.body);
//     const ommitRole = user.role !== 'admin' ? 'role' : '';
//     const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

//     await user.update(newUserObject, { override: true, upsert: true });
//     const savedUser = await User.findById(user._id);

//     res.json(savedUser.transform());
//   } catch (error) {
//     next(User.checkDuplicateEmail(error));
//   }
// };

/**
 * Update existing user
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    let updatedUser = req.body;
    if ((req.user.role !== 'admin' && req.body.role) || (req.body.role && req.body.role === 'admin')) {
      updatedUser = omit(req.body, 'role');
    }

    const user = Object.assign(req.locals.user, updatedUser);


    // In case User want change Email address
    // we change Email and send an email for new verification
    if (req.body.email !== '' && req.body.email && req.body.user === req.locals.user.email) {
      // Current user Id
      const userId = user._id;
      // Generate new token
      const newToken = crypto.randomBytes(16).toString('hex');


      // find previous token for this _id and update if not exist else
      // create new one
      const previousToken = await VerificationToken.find({
        _id: userId,
      });

      if (previousToken.length !== 0 && previousToken) {
        await VerificationToken.update({
          _id: userId,
        }, {
          token: newToken,
        });
      } else {
        await (new VerificationToken({
          _userId: userId,
          token: newToken,
        })).save();
      }

      // Token create || update in database
      // send new token by email to user new email address

      const mailOptions = {
        from: 'complex',
        to: req.body.email,
        subject: 'Account Verification Token',
        // eslint-disable-next-line no-useless-concat
        text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/v1\/auth\/confirmation\/' + newToken + '.\n',
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          throw new APIError({
            message: 'sending Email is failed ..',
            status: httpStatus.CONFLICT,
          });
        } else {
          user.isVerified = false;
          user.save()
            .then(savedUser => res.json(savedUser.transform()))
            .catch(e => next(User.checkDuplicateEmail(e)));
        }
      });
    } else {
      user.save()
        .then(savedUser => res.json(savedUser.transform()))
        .catch(e => next(User.checkDuplicateEmail(e)));
    }
    // const ommitRole = req.locals.user.role !== 'admin' ? 'role' : '';
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const {
    user
  } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
