var express = require("express"),
    app = express(),
    server = require("http").Server(app),
    io = require("socket.io")(server),
    fs = require("fs"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    routes = require("./routes/routes"),
    port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", routes.top);
app.post("/create", routes.create);
app.get("/:id([0-9]+)", routes.answer);
app.get("/q/", routes.qIndex);
app.get("/q/:num([0-9]+)", routes.question);
app.get("/admin", routes.master);

io.sockets.on("connection", function(socket) {
  socket.on("emit_from_top", function(data) {
    socket.user = data;

    // 自分含め全員
    io.sockets.emit("emit_from_server", socket.user);

    // 接続しているclientのみ
    //socket.emit("emit_from_server", "hello from server: " + data);
    // 自分以外
    //socket.broadcast.emit("emit_from_server", socket.client_name);
  });
  for (var i = 0; i < 7; i++) {
    socket.on("q" + (i + 1) + "Selection", function(data) {
      console.log(data);
      io.sockets.emit(data.socketKey, data.time);
    });
    socket.on("q" + (i + 1) + "StopAnswer", function(data) {
      io.sockets.emit(data, data);
    });
    socket.on("q" + (i + 1) + "PlayVideo", function(data) {
      io.sockets.emit(data.socketKey, data.answer);
    });
    socket.on("q" + (i + 1) + "FinalAnswer", function(data) {
      io.sockets.emit(data.socketKey, data.answer);
    });
    socket.on("q" + (i + 1) + "Ranking", function(data) {
      io.sockets.emit(data, data);
    });
  }

  socket.on("rankingData_from_answer", function(data) {
    io.sockets.emit("rankingData_from_server", data);
  });

  // 復活のボタン
  socket.on("revive", function(data) {
    io.sockets.emit("revive_from_server", data);
  });

});

server.listen(port);
console.log("http server listening on %d", port);
