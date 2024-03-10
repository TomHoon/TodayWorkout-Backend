const express = require("express");
const app = express();

const maria = require("./maria.js");
maria.connect();

const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, file.originalname);
      }
    }),
  });
app.post('/uploadFile', upload.single('img'), (req, res) => {
  console.log('file >>> ', req.file); 
  console.log('file >>> ', req.body); 
});

const bodyParser = require("body-parser");
// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = process.env.PORT || 3300;

const 마리아 = (query, param) => {
  let result = "";
  maria.query(query, param, function (err, rows) {
    if (err) {
      console.log(">>> error ");
    } else {
      console.log(">>> success ");
      console.log(">>> rows ", rows);
      result = rows;
    }
  });
  return result;
};

const joinMember = (pw) => {
  const query = "INSERT INTO MEMBER VALUES (?, ?)";
  const param = ["test", "1234"];
  return 마리아(query, param);
};


const getMember = (pw) => {
  const query = "SELECT * FROM MEMBER";
  return 마리아(query);
};

/**
 * ----------------------------------------
 */

app.use(express.static('uploads'));

// 멤버조회
app.get("/getMembers", (req, res) => {
  console.log(">>> getMember is running");

  maria.query("SELECT * FROM MEMBER", function (err, rows) {
    if (err) {
      console.log(">>> error ");
    } else {
      console.log(">>> success ");
      console.log(">>> rows ", rows[0]);

      return res.json(rows[0]);
    }
  });
});

// 비번업데이트
app.post("/updatePw", jsonParser, (req, res) => {
  console.log(">>> updateMember is running");
  console.log("req.body >>> ", req.body);

  let { member_id, member_pw } = req.body;
  let query = `UPDATE MEMBER SET member_pw =? WHERE member_id = ?`;
  let param = [member_pw, member_id];
  maria.query(query, param, function (err, rows) {
    if (err) {
      console.log(">>> error ");
    } else {
      console.log(">>> success ");
      console.log(">>> rows ", rows[0]);

      return res.json(rows[0]);
    }
  });
});



app.listen(port, () => {
  console.log(`server is listening at localhost:${process.env.PORT}`);
});
