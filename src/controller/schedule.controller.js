const _ = require('lodash');
const Schedule = require("../models/schedule.model.js");
const UploadFile = require("../models/uploadFile.model.js");

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
			};
			param['file_idx'] = data.insertId;
			schedule = new Schedule(param);
			addSchedule(schedule);
        }
    });

};

