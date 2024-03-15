const _ = require('lodash');
const Member = require("../models/member.model.js");

//회원조회
exports.find = (req, res) => {
	let member = new Member(req.query);
	member = _.pickBy(member , (value, key) => { return !_.isEmpty(value) });
	Member.find(member,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data);
		}
	});
};

//회원비밀번호 변경 예시
exports.updatePw = (req, res) => {
	let member = new Member(req.query);
	member = _.pickBy(member , (value, key) => { return !_.isEmpty(value) });
	Member.find(member,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data[0]);
		}
	});
};

//회원가입 예시
exports.joinMember = (req, res) => {
	let member = new Member(req.query);
	member = _.pickBy(member , (value, key) => { return !_.isEmpty(value) });
	Member.find(member,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data[0]);
		}
	});
};