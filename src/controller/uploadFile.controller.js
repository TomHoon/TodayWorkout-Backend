const _ = require('lodash');
const Upload = require("../models/uploadFile.model.js");

exports.find = (req, res) => {
	let upload = new Upload(req.file);
	upload = _.pickBy(upload , (value, key) => { return !_.isEmpty(value) });
	Upload.find(upload,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data[0]);
		}
	});
};
