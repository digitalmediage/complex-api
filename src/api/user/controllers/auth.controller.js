/* eslint-disable prefer-template */
const httpStatus = require('http-status');
const APIError = require('../../utils/APIError');
const crypto = require('crypto');
const User = require('../models/user.model');
const RefreshToken = require('../models/refreshToken.model');
const transporter = require('./../../utils/mailHandler');
const VerificationToken = require('./../models/verification_token.model');
const moment = require('moment-timezone');
const {
  jwtExpirationInterval,
} = require('../../../config/vars');

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
  const tokenType = 'Bearer';
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, 'minutes');
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn,
  };
}

/**
 * Verification user by email
 * @public
 */

exports.confirmationPost = (req, res, next) => {
  if (!req.params.token) {
    throw new APIError({
      message: 'confirmation params not exist',
      status: httpStatus.CONFLICT,
    });
  }

  // Find a matching token
  VerificationToken.findOne({
    token: req.params.token
  }, (err, token) => {
    if (err) {
      throw new APIError({
        message: 'Token not exist',
        status: httpStatus.CONFLICT,
      });
    }

    if (!token) {
      throw new APIError({
        message: 'confirmation params not exist and token my have expired',
        status: httpStatus.CONFLICT,
      });
    }

    User.findOne({
      _id: token._userId
    }, (_err, user) => {
      if (_err) res.status(400).json({
        error: _err
      });
      if (!user) res.status(400).send({
        msg: 'We were unable to find a user for this token.'
      });
      if (user.isVerified) res.status(400).send({
        type: 'already-verified',
        msg: 'This user has already been verified.'
      });

      // user exist and must be verify
      // eslint-disable-next-line no-param-reassign
      console.log(user);
      user.isVerified = true;
      user.save((__err) => {
        if (__err) {
          res.status(500).send({
            msg: __err.message,
          });
        }
        res.status(200).send('The account has been verified. Please log in.');
      });
    });
  });
};


/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const user = await (new User(req.body));
    user.save((err, __user) => {
      if (err) {
        console.log(err);
        console.log('error');
        throw new APIError({
          message: ' request without email (register) ',
          status: httpStatus.CONFLICT,
        });
      }

      const token = new VerificationToken({
        _userId: __user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });

      token.save(async (err_) => {
        if (err_) {
          throw new APIError({
            message: 'verification token can not save',
            status: httpStatus.CONFLICT,
          });
        }

        const mailOptions = {
          from: 'complex',
          to: req.body.email,
          subject: 'Account Verification Token',
          // eslint-disable-next-line no-useless-concat
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/v1\/auth\/confirmation\/' + token.token + '.\n',
        };

        await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            throw new APIError({
              message: 'sending Email is failed ..',
              status: httpStatus.CONFLICT,
            });
          }
          res.status(httpStatus.OK);
          res.json({
            message: `A verification email has been sent to ${__user.email} .`,
            info,
          });
        });
      });
    });

    // const userTransformed = user.transform();
    // const token = generateTokenResponse(user, user.token());
    // res.status(httpStatus.CREATED);
    // return res.json({
    //   token,
    //   user: userTransformed,
    // });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  const emailAddress = req.body.email;
  if (emailAddress) {
    await User.find({
      email: emailAddress,
    }, async (err, _user_) => {
      if (_user_.length === 0) {
        res.status(httpStatus.CONFLICT);
        res.json({
          type: 'user-no-exist',
          message: 'User not exist',
        });
        return;
      }

      if (!_user_[0].isVerified) {
        // User not Verified by email
        res.json({
          type: 'not-verified',
          message: 'Your account has not been verified',
        });
      } else {
        try {
          const {
            user,
            accessToken,
          } = await User.findAndGenerateToken(req.body);
          const token = generateTokenResponse(user, accessToken);
          const userTransformed = user.transform();
          res.json({
            token,
            user: userTransformed,
          });
        } catch (error) {
          next(error);
        }
      }
    });
  } else {
    // Request without email
    throw new APIError({
      message: ' request without email ',
      status: httpStatus.CONFLICT,
    });
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const {
      user,
    } = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({
      token,
      user: userTransformed,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const {
      email,
      refreshToken,
    } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken,
    });
    const {
      user,
      accessToken,
    } = await User.findAndGenerateToken({
      email,
      refreshObject,
    });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
