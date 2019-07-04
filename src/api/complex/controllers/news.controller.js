const NewsModel = require('./../DAO/news.dao');

exports.createNews = (req, res, next) => {
  NewsModel.create(req.body, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    }

    res.json({
      message: 'News created successfully',
      data: complex,
      status: 200,
    });
  });
};


exports.getNews = (req, res, next) => {
  NewsModel.get({}, (err, complex) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    console.log(complex);

    res.json({
      message: 'Get News',
      data: complex,
      status: 200,
    });
  });
};
