const sql = require("../../maria.js");
const logger = require('../log/logger.js');
// 생성자 
Upload = function(param) {
	this.filename = param.originalname
};

//파일업로드 후 DB저장 예시
Upload.uploadFile = (upload, result) =>{
	const query = 'INSERT INTO FILE(file_name) VALUES (?)';
	sql.query(query,[upload.filename], (err,res)=>{
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