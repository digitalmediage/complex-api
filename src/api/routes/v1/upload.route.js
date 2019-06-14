const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Img = require('./../../core/models/Img.model');
const Media = require('./../../complex/models/media.model');

const router = express.Router();
const rootDir = path.dirname(require.main.filename);


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(rootDir, '/storage/uploads/'));
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
});

const uploadHandler = (req, res, next) => {
  console.log(rootDir);
  res.sendFile(`${rootDir}/tests/upload/upload.html`);
};

router.get('/', uploadHandler);

// eslint-disable-next-line consistent-return
router.post('/', upload.single('myFile'), (req, res, next) => {
  // eslint-disable-next-line prefer-destructuring

  const new_img = new Img();
  new_img.img.data = fs.readFileSync(req.file.path);
  new_img.img.contentType = 'image/jpeg';
  new_img.save();

  res.send(new_img._id);




  // const file = req.file;
  // if (!file) {
  //   const error = new Error('Please upload a file');
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }

  // const Media_ = {
  //   path: `${file.path}.${req.type || 'jpg'}`,
  //   name: req.name || '',
  // };

  // const MediaObj = new Media(Media_);
  // MediaObj.save();

  // res.send(MediaObj);
});

module.exports = router;
