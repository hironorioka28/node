var users = [],
    questions = [
      {
        qx: "2015年6月25日、4年7ヶ月の付き合いを経て、晴れてご夫婦となられたお二人です。",
        q: "お二人の正しい漢字はどれでしょう？",
        a: "B"
      },
      {
        qx: "新婦の美由紀さんはディズニーが大好きです。その中でもミニーマウスがお好きだそうです。",
        q: "次の４つの中でミニーマウスはどれでしょう？",
        a: "D"
      },
      {
        qx: "お二人共スターウォーズがとてもお好きです。",
        q: "次の４つの中でスターウォーズの名言はどれでしょう？",
        a: "A"
      },
      {
        qx: "新郎一洋さんと新婦美由紀さんは、実は５歳差のご夫婦です。",
        q: "次の４つの中で５が入るのはどれでしょう？",
        a: "D"
      },
      {
        qx: "二人が出会ったきっかけは、東京個別指導学院の自由が丘教室でした。",
        q: "二人が出会った東京個別指導学院自由が丘教室はどれでしょう？",
        a: "B"
      },
      {
        qx: "美由紀さんに想いを抱いていた一洋さんは、告白のときに花束を渡しました。",
        q: "美由紀さんが取った行動は次のうちどれでしょう？",
        a: "C"
      },
      {
        qx: "2016年1月27日、碧くんが誕生しました。",
        q: "碧くんはどれでしょう？",
        a: "A"
      },
      {
        qx: "トイレットペーパー速巻き対決！！",
        q: "1位になるのは次の4組のうち、どこでしょう？",
        a: "X"
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
    preQuestion: questions[qNo - 1].qx,
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
