const router = require('express').Router();
const chat = require('../controller/chat.controller.js');


// ''빈칸이면 넘어온 요청 defalt (/chat)
router.get('', (req, res) => {
    chat.getChat(req, res);
});

module.exports = router;