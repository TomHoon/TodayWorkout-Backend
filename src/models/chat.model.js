const sql = require("../../maria.js");
const logger = require('../log/logger.js');
// 생성자 
Chat = function(param) {
	this.test = param.test;
};

//파일업로드 후 DB저장 예시
Chat.getChat = (chat, result) =>{
	const query = 'SELECT * FROM CHAT';
	sql.query(query, (err,res)=>{
		if(err){
			logger.error("error: ", err);
			result(err, null);
			return;
		}
		logger.info("upload: ", res);
		result(null, res);
	});
};
module.exports = Chat;