function save() {
    var player = document.getElementById("userName").value;
    localStorage.setItem("Player", player);

}

function ask(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

ask.prototype.correct = function (choice) {
    return this.answer === choice;
}

function test(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

test.prototype.askIndex = function () {
    return this.questions[this.questionIndex];
}

test.prototype.guess = function (answer) {
    if (this.askIndex().correct(answer)) {
        this.score++;
        var response = document.getElementById("response");
        response.innerHTML = "<p> Correct </p>"
        var x = document.getElementById("response");
        setTimeout(function () { x.innerHTML = "" }, 1000);

    }

    else {

        var response = document.getElementById("response");
        response.innerHTML = "<br> Not Correct";
        var x = document.getElementById("response");
        setTimeout(function () { x.innerHTML = "" }, 1000);
        // var timeLeft = document.querySelector('#countdown');
        // var newTime = (timeLeft.innerHTML - 10);
        // console.log(newTime)

        // newGo(3, 0)

        // function newGo(m, s) {
        //     document.getElementById("countdown").innerHTML = "0"
        //     document.getElementById("countdown").innerHTML = m + ":" + s;
        //     s == 0 ? (m == 0 ? highScore() : (m--, s = 60, t())) : (s--, t1());
        //     function t1() { setTimeout(function () { newGo(m, s) }, 1000) };
        // }




    }

    this.questionIndex++;

}

test.prototype.finished = function () {
    return this.questionIndex === this.questions.length;
}

function verify() {
    if (document.getElementById('userName').value === "") {
        alert("Please enter a name to begin")
    }
    else { makeIt() }
}

function makeIt() {
    if (quiz.finished()) {
        results();

    }
    else {

        var buttonHTML = "<br>" + "<hr style='height:1px; border:none; color:#ffa500; background-color:red; width:85%; text-align:center; margin: 0 auto;'>" + "<br>" + '<button id="button0"> <span id="choice0"></span></button>';
        buttonHTML += '<button id="button1"> <span id="choice1"></span></button>';
        buttonHTML += '<button id="button2"> <span id="choice2"></span></button>';
        buttonHTML += '<button id="button3"> <span id="choice3"></span></button>';
        var belement = document.getElementById("buttongroup");
        belement.innerHTML = buttonHTML;

        // display question
        var qelement = document.getElementById("question");
        qelement.innerHTML = quiz.askIndex().text;

        // give choices 
        var choices = quiz.askIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var aelement = document.getElementById("choice" + i);
            aelement.innerHTML = choices[i];
            guess("button" + i, choices[i]);
        }

    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        setTimeout(function () { makeIt(); }, 1000);

    }

};

function results() {
    highScore()

};

function highScore() {

    var hScore = "<br><h1>High Scores</h1>";

    helemenemt = document.getElementById("quiz");
    helemenemt.innerHTML = hScore + "<br>" + localStorage.getItem("Player") + " :   " + quiz.score + " out of " + quiz.questions.length

}

// create questions
var questions = [
    new ask("Inside which HTML element do we put the JavaScript?", ["javascript", "scripting", "js", "script"], "script"),
    new ask("Where is the correct place to insert a JavaScript?", ["head section", "body section", "Either head or body", "footer section"], "Either head or body"),
    new ask("How do you write 'Hello World' in an alert box?", ["msgBox('Hello World');", "alert('Hello World');", "msg('Hello World');", "alertBox('Hello World');"], "alert('Hello World');"),
    new ask("How do you create a function in JavaScript?", ["Function myFunction()", "function:myFunction()", "function = myFunction()", "function myFunction()"], "function myFunction()"),
    new ask("How do you round the number 7.25, to the nearest integer?", ["rnd(7.25", "Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)"], "Math.round(7.25)")
];

// create quiz
var quiz = new test(questions);


function go(mm, ss) {
    document.getElementById("countdown").innerHTML = mm + ":" + ss;
    ss == 00 ? (mm == 00 ? highScore() : (mm--, ss = 60, t())) : (ss--, t());
    function t() { setTimeout(function () { go(mm, ss) }, 1000) };

}


