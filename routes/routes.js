var users = [];

// top
exports.top = function(req, res) {
  res.render("top", {
    title: ""
  });
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

  // パラメータとusers配列のidが一致したかどうかのチェック
  for (var key in users) {
    if (users[key].uid === req.params.id) {
      user = users[key].name;
    }
  }
  res.render("answer", {
    title: user,
    user: user
  });
};

// 質問インデックス
exports.qIndex = function(req, res) {
  res.render("qIndex", {
    title: "index of question"
  });
};

// 各問題
exports.question = function(req, res) {
  var qNo = req.params.num;

  res.render("q/" + qNo, {
    title: "Q" + qNo,
    num: parseInt(qNo)
  });
};

// admin
exports.master = function(req, res) {
  res.render("master", {
    title: "master"
  });
};
