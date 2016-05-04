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

  socket.on("q1Selection", function(data) {
    io.sockets.emit("showSelection_from_server", data);
  });
  socket.on("q1StopAnswer", function(data) {
    io.sockets.emit("stopAnswer_from_server", data);
  });
  socket.on("q1PlayVideo", function(data) {
    io.sockets.emit("playVideo_from_server", data);
  });
  socket.on("q1FinalAnswer", function(data) {
    io.sockets.emit("finalAnswer_from_server", data);
  });
  socket.on("q1Ranking", function(data) {
    io.sockets.emit("ranking_from_server", data);
  });

  socket.on("rankingData_from_answer", function(data) {
    io.sockets.emit("rankingData_from_server", data);
  });

  socket.on("revive", function(data) {
    io.sockets.emit("revive_from_server", data);
  });

});

server.listen(port);
console.log("http server listening on %d", port);
