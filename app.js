var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs");

app.listen(1337);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error");
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  });
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
