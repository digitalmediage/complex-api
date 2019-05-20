/* eslint-disable guard-for-in */
const parseQuery = (query = {}, filterOptions) => {
  const objectQuery = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const q in query) {
    // eslint-disable-next-line no-prototype-builtins
    if (query.hasOwnProperty(q) && filterOptions.includes(q)) {
      objectQuery[q] = query[q];
    }
  }
  return objectQuery;
};

module.exports = parseQuery;
