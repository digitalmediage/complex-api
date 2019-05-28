const httpStatus = require('http-status');
// const nodeMailer = require('nodemailer');

// Utility
const APIError = require('../../utils/APIError');
const transporter = require('./../../utils/mailHandler');
const {
  checkExistedObjectIdAtDocument,
} = require('./../../utils/ModelHelper');

// Model
// TODO set checking for exist picture and complex
const UserModel = require('./../../user/models/user.model');
const complexModel = require('./../DAO/complex.dao');
// const media = require('./../../complex/models/media.model');


// eslint-disable-next-line consistent-return
exports.setPermishion = async (req, res, next) => {
  // Check if req whiteout complex
  if (!req.body.complex && req.body.complex === null && req.body.complex === undefined) {
    throw new APIError({
      message: ' Complex Not exist',
      status: httpStatus.CONFLICT,
    });
  }

  // Check if complex id exist in Complex Model at dataBase
  await checkExistedObjectIdAtDocument(req.body.complex, complexModel, null, 'complex not exist');


  try {
    const user = req.user.transform();

    // create  random password
    const randomstring = Math.random().toString(36).slice(-8);

    // manager data
    const requestData = {
      email: req.body.email,
      name: req.body.name ? req.body.name : '',
      picture: req.body.picture ? req.body.picture : '',
      role: 'manager',
      isVerified: true,
      password: randomstring,
      manager: {
        complex: req.body.complex,
        activation: false,
      },
    };

    const newManager = new UserModel(requestData);
    newManager.save()
      .then(async (managerUser) => {
        // Email configurations
        const mailOptions = {
          from: 'complex',
          to: req.body.email,
          // eslint-disable-next-line prefer-template
          subject: ` Invite From ${user.name || ''}`,
          text: `you must sign in at complex website and continue for registrations
              your username is your email address and your first use password is ${randomstring}`,
        };

        const emailRespose = await transporter.sendMail(mailOptions);
        const emailStatus = emailRespose.response;

        if (!emailStatus && !emailStatus.includes('OK')) {
          throw new APIError({
            message: 'Email can not send',
            status: httpStatus.CONFLICT,
            isPublic: true,
          });
        }

        const complex = await complexModel.findOne({ _id: req.body.complex });
        console.log(complex);
        console.log('complex');
        console.log(complex);

        if (!complex) {
          throw new APIError({
            message: 'Complex not found',
            status: httpStatus.CONFLICT,
            isPublic: true,
          });
        }

        // Get current manager and other previous
        console.log(complex);
        const currentManager = complex.manager.current_manager;
        const managerHistory = complex.manager.history;

        let newManagerData = {};
        // create new manager instance for update complex
        if (!currentManager || currentManager === null || currentManager === undefined) {
          newManagerData = {
            current_manager: managerUser._id,
            history: [],
          };
        } else {
          const history_ = managerHistory;
          history_.push(currentManager);
          newManagerData = {
            current_manager: managerUser._id,
            history: history_,
          };
        }

        await complexModel.update({
          _id: complex._id,
        }, {
          manager: newManagerData,
        }, (err, updatedComplex) => {
          if (updatedComplex) {
            res.json({
              manager: newManagerData,
              complex: updatedComplex,
            });
          } else {
            return next(err);
          }
        });
      })
      .catch((promiseErro) => {
        return next(promiseErro);
      });
  } catch (err) {
    return next(err);
  }
};
