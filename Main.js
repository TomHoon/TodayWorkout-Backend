const express = require("express");
const app = express();

const maria = require("./maria.js");
maria.connect();

const port = process.env.PORT || 3300;

const 마리아 = (query, param) => {
  let result = "";
  maria.query(query, param, function (err, rows) {
    if (err) {
      console.log("#### error ");
    } else {
      console.log("#### success ");
      console.log("#### rows ", rows);
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

app.get("/members", (req, res) => {
  maria.query("SELECT * FROM MEMBER", function (err, rows) {
    if (err) {
      console.log("#### error ");
    } else {
      console.log("#### success ");
      console.log("#### rows ", rows[0]);

      return res.json(rows[0]);
    }
  });
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${process.env.PORT}`);
});
