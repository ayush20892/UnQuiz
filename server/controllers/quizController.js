const BigPromise = require("../middlewares/bigPromise");
const Quiz = require("../models/quizModel");
const WhereClause = require("../utils/whereClause");
const { extend } = require("lodash");

exports.getAllQuiz = BigPromise(async (req, res) => {
  // const quizzes = new WhereClause(Quiz.find(), req.query)
  //   .search()
  //   .filter()
  //   .pager();

  const quiz = await Quiz.find();

  res.status(200).json({
    success: true,
    quiz,
  });
});
