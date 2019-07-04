/* eslint-disable arrow-body-style */


exports.listComplex = (
  query = Object.create(null),
  cb,
  page = 1,
  perPage = 2,
  that,
) => {
  return that.find(query, cb)
    .sort({
      createdAt: -1,
    })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('properties')
    .populate({
      path: 'properties',
      populate: {
        path: 'media.images media.baner',
        model: 'Media',
      },
    })
    .populate('baner_image media map_image');
};

exports.listPayment = (
  query = Object.create(null),
  cb,
  page = 1,
  perPage = 2,
  that,
) => {
  return that.find(query, cb)
    .sort({
      createdAt: -1,
    })
    .skip(perPage * (page - 1))
    .limit(perPage)
};

exports.listCharge = (
  query = Object.create(null),
  cb,
  page = 1,
  perPage = 2,
  that,
) => {
  return that.find(query, cb)
    .sort({
      createdAt: -1,
    })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('user')
    .populate('property');
};


exports.listProperty = (
  query = Object.create(null),
  cb,
  page = 1,
  perPage = 2,
  that,
) => {
  return that.find(query, cb)
    .sort({
      createdAt: -1,
    })
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('complex')
    .populate('media.images media.baner');
};
//   const options = omitBy({ name, email, role }, isNil);
