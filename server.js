var express = require('express');

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 3000;
var profiles = [];

// functions for creating surveys and returning data
// Profile will have information and survey results

var questions = ["How athletic do you consider yourself?", "How organzied or tidy are you?", "How much do you value structure?", "How important is your family in your life?", "What would you rate your level of sentimentality?", "What would you rate your level of creativity?", "How impulsive are you as a person?", "How important is punctuality to you?", "How much of a night owl are you?", "How much of an early bird are you?"];

function createProfile(firstName, lastName, email, gender, seeking){
  survey = createSurvey();
  profile = {
    firstName,
    lastName,
    email,
    gender,
    seeking
  }
  return [survey, profile];
}

function createQuestion(question){
  return {
    question: question,
    score: 0
  }
}

function createSurvey(){
  survey = [];
  for (var i = 0; i < questions.length; i++){
    survey.push(createQuestion(questions[i]));
  }
  return survey;
}

app.get('/survey', function(req, res){

});

app.get('/', function(req, res){

});

app.get('/api/friends', function(req, res){

});

app.post('/api/friends', function(req, res){

});

app.listen(PORT, function(){
  console.log("App listening on PORT " + PORT);
});

