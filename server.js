var express = require('express');
var fs = require("fs");
var path = require("path");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./app/public"));

const PORT = process.env.PORT || 3000;

const profileFunctions = require('./app/data/friends');
var data = fs.readFileSync('./app/data/friends.json');
var profiles = JSON.parse(data);

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

// Potential use in the page that we route back to, otherwise delete
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

// TODO: Fix same sex matching
function compareProfiles(allProfiles){
  var indexOfMatch;
  var difference = 1000;
  var newProfile = allProfiles[allProfiles.length - 1];

  for (var i = 0; i < allProfiles.length - 1; i++){
    var currentDifference  = 0;
    for (var j = 0; j < allProfiles[i].survey.length; j++){
      currentDifference += Math.abs(allProfiles[i].survey[j] - newProfile.survey[j]);
    }
    if (currentDifference < difference && allProfiles[i].gender === newProfile.seeking && allProfiles[i].seeking === newProfile.gender){
      indexOfMatch = i;
      difference = currentDifference;
    }
  } 
  return [indexOfMatch, difference];
}

app.get('/survey', function(req, res){

  // console.log(req.url);
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
}
);

app.get('/api/questions', function(req, res){
  res.json(createSurvey());
});

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "/app/public/index.html"));
});

app.get('/results', function(req, res){
  res.sendFile(path.join(__dirname, "/app/public/results.html"));
});

app.get('/allProfiles', function(req, res){
  res.sendFile(path.join(__dirname, "/app/public/allProfiles.html"));
});

app.get('/api/results', function(req, res){
  // console.log(req);
  var match = compareProfiles(profiles);

  var responseObject = {
    profile: profiles[match[0]],
    difference: match[1]
  };

  res.json(responseObject);
});

app.get('/api/oneProfile', function(req, res){
  var response = profiles[req.profile];
  res.json(response);
});

app.get('/api/allProfiles', function(req, res){
  var response = profiles;
  res.json(response);
});

app.post('/api/friends', function(req, res){
  data = fs.readFileSync('./app/data/friends.json');
  profiles = JSON.parse(data);
  var currentProfile = (req.body);
  
  var newArray = [];
  for (var i = 0; i < currentProfile.survey.length; i++){
    newArray.push(Number(currentProfile.survey[i]));
  }
  currentProfile.survey = newArray;

  profiles.push(currentProfile);
  fs.writeFile('./app/data/friends.json', JSON.stringify(profiles, null, 2), function(){
    res.redirect('/results', 200);
  });
});

app.listen(PORT, function(){
  console.log("App listening on PORT " + PORT);
});