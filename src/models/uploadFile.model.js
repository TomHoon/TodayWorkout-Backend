const sql = require("../../maria.js");
const logger = require('../log/logger.js');
// 생성자 
Upload = function(param) {
	console.log('Param이야', param.originalname)
	this.testParam = param.originalname
};

//파일업로드 후 DB저장 예시
Upload.find = (upload, result) =>{
	const query = 'INSERT INTO member(idMEMBER) VALUES (?)';
	sql.query(query,[upload.testParam], (err,res)=>{
		if(err){
			logger.error("error: ", err);
			result(err, null);
			return;
		}
		logger.info("upload: ", res);
		result(null, res);
	});
};
module.exports = Upload;