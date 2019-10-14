var express = require('express');
var fs = require("fs");
var path = require("path");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var PORT = 3000;

// functions for creating surveys and returning data
// Profile will have information and survey results

var questions = ["How athletic do you consider yourself?", "How organzied or tidy are you?", "How much do you value structure?", "How important is your family in your life?", "What would you rate your level of sentimentality?", "What would you rate your level of creativity?", "How impulsive are you as a person?", "How important is punctuality to you?", "How much of a night owl are you?", "How much of an early bird are you?"];

function createProfile(firstName, lastName, email, gender, seeking, profile){
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
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.get('/api/questions', function(req, res){
  res.json(createSurvey());
})

app.get('/', function(req, res){
  // This is the catch all route that leads to the home page
});

app.get('/api/friends', function(req, res){
  // This is a get route to display all of the possible friends
});

app.post('/api/friends', function(req, res){
  // This is route that will handle all incoming survey results
});

app.listen(PORT, function(){
  console.log("App listening on PORT " + PORT);
});

// Stack Overflow suggestion for centering labels on radio buttons
/*
label {
  float: left;
  padding: 0 1em;
  text-align: center;
}
<label for="myChoice1">Choice 1<br />
  <input type="radio" id="myChoice1" name="myChoice" value="1" />
</label>

<label for="myChoice2">Choice ABC<br />
  <input type="radio" id="myChoice2" name="myChoice" value="ABC" />
</label>

<label for="myChoice3">Choice qwerty<br />
  <input type="radio" id="myChoice3" name="myChoice" value="qwerty" />
</label>

<label for="myChoice4">Choice--final<br />
  <input type="radio" id="myChoice4" name="myChoice" value="final" />
</label>
*/