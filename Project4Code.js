// Question and answer data array
const data = [
    {
      question: "Q1",
      answer: "A1",
    },
    {
      question: "Q2",
      answer: "A2",
    },
    {
      question: "Q3",
      answer: "A3",
    },
  ];
  
  // Export statement must be below data declaration - no hoisting with const
  module.exports = {
    data,
  }; 


//---------------------------------------------------------------------------------------------------

const { data } = require("./p4-data");

console.log(data);

//const originalData = require('./p4-data');

function getQuestions() {
  const questions = ["Q1", "Q2", "Q3"];
  return questions;
}
console.log(getQuestions());

function getAnswers() {
  const answers = ["A1", "A2", "A3"];
  return answers;
}
console.log(getAnswers());

function getQuestionsAnswers() {
  const copiedData = JSON.parse(JSON.stringify(data));
  return copiedData;
}
console.log(getQuestionsAnswers());

function getQuestion(number = "") {
  if (!number) {
    return data.map((obj) => obj.question);
  }

  const questionInfo = {
    question: "",
    number: number,
    error: "",
  };

  const questionIndex = number - 1;
  const questionObject = data[questionIndex];

  if (questionObject) {
    questionInfo.question = questionObject.question;
  } else {
    questionInfo.error = "Question not found";
  }  

  return questionInfo;
}
console.log(getQuestion((number = "1")));

function getAnswer(number = "") {
  if (!number) {
    return data.map((obj) => obj.answer);
  }
  
  const answerInfo = {
    answer: "",
    number: number,
    error: "",
  };

  const questionIndex = number - 1;
  const questionObject = data[questionIndex];

  if (questionObject) {
    answerInfo.answer = questionObject.answer;
  } else {
    answerInfo.error = "Answer not found";
  }

  return answerInfo;
}
console.log(getAnswer(1));

function getQuestionAnswer(number = "") {
    if (!number) {
      return data.map((obj) => obj.question.answer);
    }
  
  const questionAnswerInfo = {
    question: "",
    answer: "",
    number: number,
    error: "",
  };

  const questionIndex = number - 1;
  const questionObject = data[questionIndex];

  if (questionObject) {
    questionAnswerInfo.question = questionObject.question;
    questionAnswerInfo.answer = questionObject.answer;
  } else {
    questionAnswerInfo.error = "Question and answer not found";
  }

  return questionAnswerInfo;
}
console.log(getQuestionAnswer(1));

//-------------------------------------------------------------------------------------------------------------------------

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

// Set a constant to true to test the appropriate function
const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false; // Extra credit
const testUpdate = false; // Extra credit
const testDelete = false; // Extra credit

// getQuestions()
if (testGetQs) {
  testing("getQuestions", { d: "()", f: getQuestions() });
}

// getAnswers()
if (testGetAs) {
  testing("getAnswers", { d: "()", f: getAnswers() });
}

// getQuestionsAnswers()
if (testGetQsAs) {
  testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
}

// getQuestion()
if (testGetQ) {
  testing(
    "getQuestion",
    { d: "()", f: getQuestion() }, // Extra credit: +1
    { d: "(0)", f: getQuestion(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) } // Extra credit: +1
  );
}

// getAnswer()
if (testGetA) {
  testing(
    "getAnswer",
    { d: "()", f: getAnswer() }, // Extra credit: +1
    { d: "(0)", f: getAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) } // Extra credit: +1
  );
}

// getQuestionAnswer()
if (testGetQA) {
  testing(
    "getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() }, // Extra credit: +1
    { d: "(0)", f: getQuestionAnswer(0) }, // Extra credit: +1
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) } // Extra credit: +1
  );
}

module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
};


//----------------------------------------------------------------------------------------------

const myFunctions = require("./p4-module");

const fastify = require("fastify")();

fastify.get("/cit/question", (request, reply) => {
  const questions = myFunctions.getQuestion();
  const questionNumbers = [1, 2, 3];
  const questionObjects = questionNumbers.map((number) =>
    myFunctions.getQuestion(number)
  );

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      questions: questions,
    });
}); 

fastify.get("/cit/answer", (request, reply) => {
  const answers = myFunctions.getAnswer();
  const answerNumbers = [1, 2, 3];
  const questionObjects = answerNumbers.map((number) =>
    myFunctions.getAnswer(number)
  );

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "",
      statusCode: 200,
      answers: answers,
    });
});


fastify.get("/cit/questionanswer", (request, reply) => {
    const questionAnswers = [];
    const questionAnswerNumbers = [1,2,3];
    questionAnswerNumbers.forEach((number) => {
    const questionAnswer = myFunctions.getQuestionAnswer(number);
    questionAnswers.push({
        question: questionAnswer.question,
        answer: questionAnswer.answer,
    });
});
  
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: "",
        statusCode: 200,
        questions_answers: questionAnswers,
      });
  });




  fastify.get("/cit/student/:id", (request, reply) => {
    /* don't forget the ":" in the path to indicate that id is
    a parameter*/
    //reading the parameter from the request.params
    const { id } = request.params;
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(getStudentById(id));
  });




  fastify.get("/cit/question:number", (request, reply) => {
    const { number } = request.params;
    const questionInfo = myFunctions.getQuestion(number);
  
    const response = {
      error: questionInfo.error,
      statusCode: questionInfo.error ? 404 : 200,
      question: questionInfo.question,
      number: questionInfo.number,
    };
  
    reply
      .code(response.statusCode)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(response);
  });


//Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
