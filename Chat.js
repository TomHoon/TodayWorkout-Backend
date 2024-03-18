const SocketIO = require("socket.io");
const sql = require("./maria.js");

Chatting = (field) => {
  this.member_id = field.user;
  this.message = field.message;
}

const saveMsg = (chat) => {
	const query = 'INSERT INTO CHAT(member_id, message) VALUES(?, ?);';
	sql.query(query,[chat.user, chat.message], (err,res)=>{
    console.log('>>>> ', chat);
	});
}

const 소켓 = {
  construct: (server) => {
    const io = SocketIO(server, {
      cors: {
        origin: "*",
      },
    });
    io.on("connection", function (socket) {
      socket.on("SEND_MESSAGE", function (data) {
        io.emit("MESSAGE", data);
        saveMsg(data);
      });
    });
  },
};



module.exports = 소켓;
