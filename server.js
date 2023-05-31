const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


io.on("connection", (socket) => {
  console.log("ユーザーが接続しました");
  socket.on("like1" , (emoji1)=>{
    console.log("絵文字："+emoji1)
    io.emit("like1",emoji1);
  })

  socket.on('startTimer', () => {
    let time = 300;

    const timer = setInterval(() => {
      time--;
      const minutes = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');
      const currentTime = `${minutes}:${seconds}`;
      io.emit('updateTimer', currentTime);

      if (time <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  });
  
});




server.listen(process.env.PORT || 3000, () => {
  console.log("listenin on 3000");
});