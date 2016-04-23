var users = [];

exports.top = function(req, res) {
  res.render("top");
};
exports.create = function(req, res) {
  var user = {
    uid: uid(),
    name: req.body.user
  };
  users.push(user);
  res.redirect("/" + user.uid);

  // ユニークなuidを生成
  function uid() {
    var random = Math.floor(Math.random() * 1000),
        date = new Date(),
        time = date.getTime();

    return random + time.toString();
  };
};
exports.answer = function(req, res) {
  var user = "",
      uid = 0;
  for (var key in users) {
    if (users[key].uid === req.params.id) {
      user = users[key].name;
      uid = users[key].uid;
    }
  }
  res.render("answer", {
    user: user,
    uid: uid
  });
};
exports.question = function(req, res) {
  res.render("question");
};
exports.questions = function(req, res) {
  res.render("questions", {num: req.params.num});
};
exports.master = function(req, res) {
  res.render("master");
};
