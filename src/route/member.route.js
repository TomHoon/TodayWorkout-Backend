const router = require('express').Router();
const member = require('../controller/member.controller.js');

// ''빈칸이면 넘어온 요청 defalt (/members)
router.get('', member.find);

// 해당요청은 /members/updatePw로 요청왔을시 작동하는 구조
router.post('/updatePw', member.updatePw);

// 해당요청은 /members/joinMember 요청왔을시 작동하는 구조
router.post('/joinMember', member.joinMember);

module.exports = router;