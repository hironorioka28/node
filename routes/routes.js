var users = [],
    questions = [
      {
        q: "新郎・新婦、それぞれの名前を漢字で書いたとき、正しいものはどれでしょう？",
        a: "B"
      },
      {
        q: "ミニーちゃんはどれでしょう？",
        a: "D"
      },
      {
        q: "スターウォーズはどれでしょう？",
        a: "A"
      },
      {
        q: "【早押し】新郎・新婦の年齢の差は5歳ですが、次のうち□に5が当てはまるのはどれでしょう？",
        a: "C"
      },
      {
        q: "二人が出会った場所は東京個別指導学院という塾でしたが、次のうち、東京個別指導学院はどれでしょう？",
        a: "B"
      },
      {
        q: "新郎が新婦に初めて告白したとき、新郎は新婦に花束を渡しました。さて、そのときの新婦の行動はどれでしょう？",
        a: "D"
      },
      {
        q: "【早押し】今年二人の間に生まれた碧くん。さて、次のうち碧くんはどれでしょう？",
        a: "A"
      }
    ];

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
    user: user,
    questions: questions
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
    num: parseInt(qNo),
    question: questions[qNo - 1].q
  });
};

// admin
exports.master = function(req, res) {
  res.render("master", {
    title: "master",
    questions: questions
  });
};
