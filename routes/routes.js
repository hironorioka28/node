var users = [];

// top
exports.top = function(req, res) {
  res.render("top");
};

// user登録
exports.create = function(req, res) {
  var user = {
    uid: req.body.uid,
    name: req.body.user
  };
  users.push(user);
  res.redirect("/" + user.uid);

};

// 回答者ページ
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

// 質問ページ
exports.question = function(req, res) {
  res.render("question");
};

// 各問題
exports.questions = function(req, res) {
  res.render("questions", {num: req.params.num});
};

// admin
exports.master = function(req, res) {
  res.render("master");
};
