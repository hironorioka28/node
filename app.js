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

var template = fs.readFileSync(__dirname + "/index.ejs", "utf-8");

app.get("/", routes.top);
app.post("/create", routes.create);
app.get("/:id([0-9]+)", routes.answer);
app.get("/q/", routes.question);
app.get("/q/:num([0-9]+)", routes.questions);
app.get("/admin", routes.master);

function handler(req, res) {
  var data = ejs.render(template);
  res.writeHead(200);
  res.write(data);
  res.end();
}

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
});

server.listen(port);
console.log("http server listening on %d", port);
