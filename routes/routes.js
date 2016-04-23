exports.top = function(req, res) {
  res.render("top");
};
exports.answer = function(req, res) {
  res.render("answer");
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
