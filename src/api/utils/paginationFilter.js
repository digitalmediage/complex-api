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
    .populate('properties');
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
    .populate('complex');
};
//   const options = omitBy({ name, email, role }, isNil);