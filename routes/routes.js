var users = [],
    user_id = 0;

exports.top = function(req, res) {
  res.render("top");
};
exports.create = function(req, res) {
  var user = {
    id: user_id,
    name: req.body.hoge
  };
  users.push(user);
  user_id++;
  console.log(users);
  res.redirect("/" + user.id);
};
exports.answer = function(req, res) {
  res.render("answer", {
    users: users[req.params.id].name
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
