const httpStatus = require('http-status');
const APIError = require('./APIError');


exports.checkExistedObjectIdAtDocument =
      async (pathId, model, query = null, errMeesage = 'Internal Error') => {
        try {
          let queryObj;
          if (query) {
            queryObj = Object.assign({
              _id: pathId,
            }, query);
            console.log(queryObj);
          } else {
            queryObj = {
              _id: pathId,
            };
          }
          const uploadFile = await model.find(queryObj);
          console.log(uploadFile.length);
          console.log('developer');

          if (uploadFile.length === 0) {
            throw new APIError({
              message: errMeesage,
              status: httpStatus.CONFLICT,
            });
          }
        } catch (err) {
          console.log(err);
          throw new APIError({
            message: `Internal Erro (catch) @ ${errMeesage}`,
            status: httpStatus.CONFLICT,
          });
        }
      };
