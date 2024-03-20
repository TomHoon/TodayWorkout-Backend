const sql = require("../../maria.js");
const logger = require('../log/logger.js');

// 생성자 
Schdule = function(param) {
	this.file_idx = param.file_idx;
	this.member_id = param.member_id;
	this.reg_date = param.reg_date;
	this.time_stamp = param.time_stamp;
	this.expire_date = param.expire_date;
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
	const query = 'INSERT INTO SCHEDULE(member_id, file_idx, reg_date, time_stamp, expire_date) VALUES(?, ?, ?, ?, ?)';
	

	param[0] = schedule.member_id;
	param[1] = schedule.file_idx;
	param[2] = schedule.reg_date;
	param[3] = schedule.time_stamp;
	param[4] = schedule.expire_date;
	
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

// [스케줄러] 벌칙자 업데이트
Schdule.expireCheck = (result) =>{
	const query = 
	`UPDATE schedule SET penalty_yn = "Y" where DATE_FORMAT(FROM_UNIXTIME(expire_date/1000), '%Y-%m-%d') < curdate() AND penalty_yn != 'Y';`;
	sql.query(query, (err,res)=>{
		if(err){
			result(err, null);
			return;
		}
		result(null, res);
	});
};

module.exports = Schdule;