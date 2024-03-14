const router = require('express').Router();
const upload = require('../controller/uploadFile.controller.js');
const path = require('path');
const uploadDirectory = path.join(__dirname, '../../uploads'); //절대 경로
const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDirectory);
      },
      filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, file.originalname);
      }
    }),
  });

// ''빈칸이면 넘어온 요청 defalt (/uploadFile)
router.post('', uploader.single('img'), (req, res) => {
    upload.find(req, res);
});

module.exports = router;