const _ = require('lodash');
const Schedule = require("../models/schedule.model.js");
const UploadFile = require("../models/uploadFile.model.js");
const logger = require('../log/logger.js');

//스케줄 조회
exports.find = (req, res) => {
	let schedule = new Schdule(req.query);
	schedule = _.pickBy(schedule , (value, key) => { return !_.isEmpty(value) });
	Schedule.find(schedule,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data);
		}
	});
};
const addSchedule = (schedule)  => {
	Schedule.addSchedule(schedule,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			
		}
	});
}

// 벌칙예정 날짜 세팅
const fnExpire_date = (time_stamp)  => {
	const timestamp = parseInt(time_stamp);
	const date = new Date(timestamp);
	const dayOfWeek = date.getDay();

	const daysToAdd = 
	dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 5 ? 5 :
	dayOfWeek === 6 ? 4 : 3;

	const expire_date = date.setDate(date.getDate() + daysToAdd);

	return expire_date;
}

//스케줄추가
exports.addSchedule = (req, res) => {
	let uploadFile = new UploadFile(req.file);
	let schedule = '';

	uploadFile = _.pickBy(uploadFile , (value, key) => { return !_.isEmpty(value) });

    UploadFile.uploadFile(uploadFile, (err, data) => {
        if (err) {
        } else {
			const { reg_date, member_id, time_stamp } = req.body;
			let param = {
				reg_date: reg_date || new Date().getTime(),
				member_id: member_id,
				time_stamp: time_stamp,
				expire_date: fnExpire_date(time_stamp),
			};
			param['file_idx'] = data.insertId;
			schedule = new Schedule(param);
			addSchedule(schedule);
        }
    });
	res.send('success');
};

// [스케줄러] 벌칙자 업데이트
exports.expireCheck = () => {
	Schedule.expireCheck((err,data) => {
		if (err) {
			err.sql = ''
			logger.error("[스케줄러] error: ", err);
		} else {
			logger.info("[스케줄러] expireCheck: ", data);
		}
	});
};
