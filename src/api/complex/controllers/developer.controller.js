const httpStatus = require('http-status');
// const nodeMailer = require('nodemailer');

// Utility
const APIError = require('../../utils/APIError');
const transporter = require('./../../utils/mailHandler');

// Model
// TODO set checking for exist picture and complex
const UserModel = require('./../../user/models/user.model');
const complexModel = require('./../DAO/complex.dao');
// const media = require('./../../complex/models/media.model');


// const getSpecificComplex = async (req) => {
//     const complexById_;
//   await complexModel.findById(req.body.complex)
//     .then((err, complex_) => {
//       if (err) {
//         throw new APIError({
//           message: `database Error ${err}`,
//           status: httpStatus.CONFLICT,
//         });
//       } else {
//         const complexById_ = complex_;
//       }
//       return complexById_;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw new APIError({
//         message: `database Error ${err}`,
//         status: httpStatus.CONFLICT,
//       });
//     });
// }

exports.setPermishion = async (req, res, next) => {
  let complex;
  if (!req.body.email && req.body.email === null && req.body.email === undefined) {
    throw new APIError({
      message: ' email is required ',
      status: httpStatus.GONE,
    });
  }

  if (req.body.complex && req.body.complex !== null && req.body.complex !== undefined) {
    try {
      await complexModel.getById(req.body.complex, (err, complex_) => {
        if (err) {
          throw new APIError({
            message: `Internal Database Error ${err}`,
            status: httpStatus.INTERNAL_SERVER_ERROR,
          });
        } else {
          complex = complex_;
          console.log('complex');
          console.log(complex);
          console.log('complex');
        }
      });
    } catch (err) {
      throw new APIError({
        message: `Internal Error ${err}`,
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  } else {
    throw new APIError({
      message: ' Complex Not exist',
      status: httpStatus.CONFLICT,
    });
  }


  const randomstring = Math.random().toString(36).slice(-8);
  const user = req.user.transform();

  const currentManager = complex.manager.current_manager;
  const managerHistory = complex.manager.history;

  console.log('currentManager');
  console.log(currentManager);
  console.log('currentManager');

  console.log('managerHistory');
  console.log(managerHistory);
  console.log('managerHistory');


  const requestData = {
    email: req.body.email,
    name: req.body.name,
    picture: req.body.picture,
    role: 'manager',
    password: randomstring,
    manager: {
      complex: req.body.complex,
      activation: false,
    },
  };

  const ManagerGenerator = async (cb) => {
    const newManager = new UserModel(requestData);
    await newManager.save(cb);
  };

  try {
    ManagerGenerator(async (err, manager) => {
      if (err) {
        res.status(httpStatus.BAD_GATEWAY);
        res.json({
          error: err,
        });
      } else {
        const mailOptions = {
          from: 'complex',
          to: req.body.email,
          // eslint-disable-next-line prefer-template
          subject: ` Invite From ${user.name || ''} , ${complex.name ? 'for' + complex.name + ' complex' : ''}`,
          text: `you must sign in at complex website and continue for registrations
              your username is your email address and your first use password is $ {randomstring}`,
        };
        let newManagerData = {};
        // create new manager instance for update complex  
        if (!currentManager || currentManager === null || currentManager === undefined) {
          newManagerData = {
            current_manager: manager._id,
            history: [],
          };
        } else {
          let history_ = managerHistory;
          history_.push(currentManager);
          newManagerData = {
            current_manager: manager._id,
            history: history_,
          };
        }

        // await mailHandler(subject, text, to, from);

        // send Email for invite manager
        // eslint-disable-next-line consistent-return
        await transporter.sendMail(mailOptions, async (error, info) => {
          if (error) {
            console.log(error);
            throw new APIError({
              message: ' email is fail ',
              status: httpStatus.CONFLICT,
            });
          }
          console.log('Message %s sent: %s', info.messageId, info.response);

          // Update Complex Manager
          await complexModel.update({
            _id: complex._id,
          }, {
            manager: newManagerData,
          }, (err_, managerInstance) => {
            if (err_) {
              console.log('manager not update');
              console.log(err_);
            }
            console.log('manager updated');
            console.log(managerInstance);
          });
        });
        res.status(httpStatus.OK);
        res.json({
          message: 'manager created successfully',
          data: manager,
          password: randomstring,
        });
      }
    });
  } catch (err) {
    throw new APIError({
      message: ' Internal Error ',
      status: httpStatus.CONFLICT,
    });
  }
};
