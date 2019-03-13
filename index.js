// Controllers
const QuestionsController = require('./controllers/questionController')
// Constants
const constants = require('./constants/constants')
/**
 *
 * @param {Number} totalMarks
 * @param {Number} hardPercentage
 * @param {Number} mediumPercent
 * @param {Number} easyPercent
 */
const generateQuestionPaper = (totalMarks, hardPercentage, mediumPercent, easyPercent) => {
  try{

    // validate the user inputs
    validate(totalMarks, hardPercentage, mediumPercent, easyPercent)

    // get questions with difficulty level easy
    let easyQuestions = QuestionsController.getQuestions(totalMarks, {
      level: constants.KEY_EASY,
      percent: easyPercent
    })

    // get questions with difficulty level medium
    let mediumQuestions = QuestionsController.getQuestions(totalMarks, {
      level: constants.KEY_MEDIUM,
      percent: mediumPercent
    })

    // get questions with difficulty level hard
    let hardQuestions = QuestionsController.getQuestions(totalMarks, {
      level: constants.KEY_HARD,
      percent: hardPercentage
    })

    // concat all the questions
    let questions = easyQuestions.concat(mediumQuestions, hardQuestions)
    return {
      questions,
      totalMarks,
      noOfQuestions: questions.length
    }
  }
  catch(e){
    // console out the errors
    console.error(e.message)
  }
}

// Check if the percentages are positive and add up to 100.
const validate = (totalMarks, ...percentages) => {
  let total = 0;
  percentages.forEach(percent=> {

    // check if the percentage marks is not in decimals
    if (((percent / 100) * totalMarks) % 1 != 0)
      throw new Error(constants.ERR_NOT_ALLOW_MARKS_DECIMAL)

    total = total + percent
  })

  // check if the sum of the percentages is 100
  if (total != 100)
    throw new Error(constants.ERR_PERCENT_NOT_100)
}

// main function to run
const main = () =>{
  let questionPaper = generateQuestionPaper(100,30,20,50)
  if (questionPaper)
    console.log(questionPaper)
}

main()
