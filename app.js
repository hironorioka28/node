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
app.get("/q/", routes.question);
app.get("/q/:num([0-9]+)", routes.questions);
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


  // masterからの出題
  socket.on("qOut_from_master", function(data) {
    socket.q = data;
    socket.broadcast.emit("qOut_from_server", socket.q);
  });
  // masterからの正解発表
  socket.on("ans_from_master", function(data) {
    socket.ans = data;
    socket.broadcast.emit("ans_from_server", socket.ans);
  });
});

server.listen(port);
console.log("http server listening on %d", port);
