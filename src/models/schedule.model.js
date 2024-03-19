const sql = require("../../maria.js");
const logger = require('../log/logger.js');

// 생성자 
Schdule = function(param) {
	this.file_idx = param.file_idx;
	this.member_id = param.member_id;
	this.reg_date = param.reg_date;
	this.time_stamp = param.time_stamp;
};

// 스케줄 조회
Schdule.find = (schedule, result) =>{
	const query = 
	`SELECT a.member_id, a.reg_date, b.file_name, a.time_stamp
	FROM SCHEDULE AS a 
	LEFT JOIN FILE AS b 
	ON a.file_idx = b.file_idx`;
	
	sql.query(query, (err,res)=>{
		if(err){
			logger.error("error: ", err);
			result(err, null);
			return;
		}
		logger.info("schedule: ", res);
		result(null, res);
	});
};

// 스케줄 추가
Schdule.addSchedule = (schedule, result) =>{
	const param = []; // member_id, file_idx;
	const query = 'INSERT INTO SCHEDULE(member_id, file_idx, reg_date, time_stamp) VALUES(?, ?, ?, ?)';
	

	param[0] = schedule.member_id;
	param[1] = schedule.file_idx;
	param[2] = schedule.reg_date;
	param[3] = schedule.time_stamp;
	
	sql.query(query, param, (err,res)=>{
		if(err){
			logger.error("error: ", err);
			result(err, null);
			return;
		}
		logger.info("schedule: ", res[0]);
		result(null, res);
	});
};
module.exports = Schdule;