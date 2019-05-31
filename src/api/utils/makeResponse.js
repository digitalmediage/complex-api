const httpStatus = require('http-status');

function makeResponse(entry, res, status = '200') {
  let status_;

  switch (status) {
    case '200':
      status_ = httpStatus.OK;
      break;
    case '201':
      status_ = httpStatus.CREATED;
      break;
    default:
      status_ = httpStatus.OK;
  }

  if (entry.error) {
    res.status(httpStatus.BAD_GATEWAY);
    res.json({
      error: entry.error,
    });
  } else {
    res.status(status_);
    res.json({
      message: entry.message,
      data: entry.result,
    });
  }
}

module.exports = makeResponse;
