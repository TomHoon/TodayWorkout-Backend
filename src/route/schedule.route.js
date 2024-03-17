const router = require('express').Router();
const schedule = require('../controller/schedule.controller.js');
const multer = require('multer');
const path = require('path');
const uploadDirectory = path.join(__dirname, '../../uploads'); //절대 경로

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

// ''빈칸이면 넘어온 요청 defalt (/schedule)
router.get('',  (req, res) => {
    schedule.find(req, res);
});

router.post('/addSchedule', uploader.single('img'), (req, res) => {
    schedule.addSchedule(req, res);
});

module.exports = router;