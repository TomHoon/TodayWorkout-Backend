const _ = require('lodash');
const Chat = require("../models/chat.model.js");

exports.getChat = (req, res) => {
	let chat = new Chat('test');
	Chat.getChat(chat,(err,data) => {
		if (err) {
			err.sql = ''
			res.send(err);
		} else {
			res.send(data);
		}
	});
};
