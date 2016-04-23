var app = require("express")(),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    fs = require("fs"),
    ejs = require("ejs"),
    routes = require("./routes/routes"),
    port = process.env.PORT || 1337;

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

var template = fs.readFileSync(__dirname + "/index.ejs", "utf-8");

app.get("/", routes.top);
app.get("/:id", routes.answer);
app.get("/q/", routes.question);
app.get("/q/:num", routes.questions);
app.get("/admin", routes.master);

function handler(req, res) {
  var data = ejs.render(template);
  res.writeHead(200);
  res.write(data);
  res.end();
}

io.sockets.on("connection", function(socket) {
  socket.on("emit_from_client", function(data) {
    socket.client_name = data.name;

    // 自分含め全員
    io.sockets.emit("emit_from_server", "[" + socket.client_name + "]" + data.msg);

    // 接続しているclientのみ
    //socket.emit("emit_from_server", "hello from server: " + data);
    // 自分以外
    //socket.broadcast.emit("emit_from_server", "hello from server: " + data);
  });
});

http.listen(port);
console.log("http server listening on %d", port);
