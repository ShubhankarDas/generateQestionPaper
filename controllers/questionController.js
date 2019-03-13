// static question bank - limitation mentioned in the index.js
const questionBank = require('../constants/questionBank.json')
/**
 *
 * @param {Number} totalMarks
 * @param {level: <String>, percent: Number} difficulty
 */
const getQuestions = (totalMarks, difficulty) => {
  let questions = []
  let remainingMarks = (difficulty.percent / 100) * totalMarks
  let selectedLevel = questionBank[difficulty.level]

  // if total marks required for a difficulty level is more than available in the question bank.
  if (remainingMarks > selectedLevel.totalMarks)
    throw new Error(`Required more ${difficulty.level} level questions to generate the paper.`)

  // traverse through the question set for a given level
  for (let i = 0; i < selectedLevel.questionSet.length; i++) {
    let questionSet = selectedLevel.questionSet[i]
    let noOfQuestionsRequired = Math.floor(remainingMarks / questionSet.marks)
    let noOfQuestionsAvailable = questionSet.questions.length

    // traverse through all the questions in the questionSet
    for (let j = 0; j < noOfQuestionsAvailable; j++) {
      // if the number of questions required is less than the number of questions available.
      if (noOfQuestionsRequired < (j + 1)) {
        break
      }

      // add the question to the result
      questions.push({
        ...questionSet.questions[j],
        difficulty: difficulty.level,
        marks: questionSet.marks
      })

      // updating the remaining marks
      remainingMarks = remainingMarks - questionSet.marks
    }

    if (remainingMarks <= 0) {
      break
    }
  }
  return questions
}

module.exports = { getQuestions }