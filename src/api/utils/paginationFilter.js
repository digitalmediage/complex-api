/* eslint-disable arrow-body-style */


const list = (
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
    .limit(perPage);
};

//   const options = omitBy({ name, email, role }, isNil);

module.exports = list;
