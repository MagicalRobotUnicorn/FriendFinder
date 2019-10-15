var express = require('express');
var fs = require("fs");
var path = require("path");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

var PORT = 3000;

const profileFunctions = require('./app/data/friends');
var data = fs.readFileSync('./app/data/friends.json');
var profiles = JSON.parse(data);

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

// TODO: Copy routing from NiteOut with respect to CSS/text return statement
app.get('/survey', function(req, res){

  console.log(req.url);
  switch (req.url) {
    case "./survey.css" :
      fs.readFile("./app/public/stylesheets/survey.css", function(err, data){
        if (err){
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }
        res.writeHead(200, {"Content-Type": "text/css"});
        res.write(data);
        return res.end();
      });
    default :    
    fs.readFile("./app/public/survey.html", function(err, data){
      if (err){
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {"Content-Type": "text/html"});
      res.write(data);
      return res.end();
    });
}
});

  // res.sendFile(path.join(__dirname, "/app/public/survey.html"));
  // res.sendFile(path.join(__dirname, "/app/public/stylesheets/survey.css"));


app.get('/api/questions', function(req, res){
  res.json(createSurvey());
});

app.get('/', function(req, res){
  // This is the catch all route that leads to the home page
});

app.get('/api/friends', function(req, res){
  // This is a get route to display all of the possible friends
});

app.post('/api/friends', function(req, res){
  data = fs.readFileSync('./app/data/friends.json');
  profiles = JSON.parse(data);
  // console.log(profiles);
  console.log("The length of the friends array before: ", profiles.length);
  var currentProfile = JSON.stringify(req.body);
  profiles.push(currentProfile);
  console.log("The length of the friends array after: ", profiles.length);
  // This is route that will handle all incoming survey results
  fs.writeFile('./app/data/friends.json', JSON.stringify(profiles), function(){
    data = fs.readFileSync('./app/data/friends.json');
    profiles = JSON.parse(data);
    console.log("The length of the friends inside the function: ", profiles.length);
  });
});

  // profileList.addProfile(currentProfile);

  // var matchIndex = profileList.compareProfiles(currentProfile);
8

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