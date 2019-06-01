/* eslint-disable camelcase */
/* eslint-disable no-else-return */
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
 *
 * @public
 */

exports.confirmationPost = async (req, res, next) => {
  try {
    if (!req.params.token) {
      throw new APIError({
        message: 'confirmation params not exist',
        status: httpStatus.CONFLICT,
      });
    }


    // Find a matching token
    const verificationToken = await VerificationToken.findOne({
      token: req.params.token,
    });

    if (!verificationToken) {
      throw new APIError({
        message: 'confirmation params not exist and token my have expired',
        status: httpStatus.CONFLICT,
      });
    }

    const user = await User.findOne({
      _id: verificationToken._userId,
    });


    if (!user || user === null || user === undefined) {
      throw new APIError({
        message: 'user no exist',
        status: httpStatus.CONFLICT,
      });
    }


    if (user.isVerified) {
      res.status(400).json({
        type: 'already-verified',
        msg: 'This user has already been verified.',
      });
    }

    // user exist and must be verify
    // eslint-disable-next-line no-param-reassign
    user.isVerified = true;
    user.save((__err) => {
      if (__err) {
        return res.status(500).json({
          msg: __err.message,
        });
      } else {
        return res.status(200).json({
          message: 'The account has been verified. Please log in',
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Returns jwt token if registration was successful
 * sen an email to user for continue registration
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const user = await (new User(req.body)).save();
    const token = await (new VerificationToken({
      _userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
    })).save();

    const mailOptions = {
      from: 'complex',
      to: req.body.email,
      subject: 'Account Verification Token',
      // eslint-disable-next-line no-useless-concat
      text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/v1\/auth\/confirmation\/' + token.token + '.\n',
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        throw new APIError({
          message: 'sending Email is failed ..',
          status: httpStatus.CONFLICT,
        });
      } else {
        const userTransformed = user.transform();
        const token_ = generateTokenResponse(user, user.token());
        res.status(httpStatus.CREATED);
        return res.json({
          token_,
          user: userTransformed,
          verification_status: info,
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      throw new APIError({
        message: ' request without email ',
        status: httpStatus.CONFLICT,
      });
    }

    const verified_user = await User.find({
      email: req.body.email,
    });

    if (verified_user.length === 0) {
      res.status(httpStatus.CONFLICT);
      return res.json({
        type: 'user-no-exist',
        message: 'User not exist',
      });
    } else if (!verified_user[0].isVerified) {
      res.status(httpStatus.CONFLICT);
      return res.json({
        type: 'not-verified',
        message: 'Your account has not been verified',
      });
    } else {
      // eslint-disable-next-line camelcase
      const {
        user,
        accessToken,
      } = await User.findAndGenerateToken(req.body);
      const token = generateTokenResponse(user, accessToken);
      const userTransformed = user.transform();
      return res.json({
        token,
        user: userTransformed,
      });
    }
  } catch (error) {
    return next(error);
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
