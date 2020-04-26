
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
        response.innerHTML = "<p style='color:green;'> Correct </p>"
        var x = document.getElementById("response");
        // timeReset()
        setTimeout(function () { x.innerHTML = "" }, 1000);

    }

    else {

        var response = document.getElementById("response");
        response.innerHTML = "<p style='color:red;'> Incorrect </p>";
        var x = document.getElementById("response");
        go();
        setTimeout(function () { x.innerHTML = "" }, 1000);

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
    var listHtml = "<div id='result' class='wrapper'> </div>"
    var overHtml = "<h1> Quiz Over</h1>";
    oelemenemt = document.getElementById("quiz");
    oelemenemt.innerHTML = overHtml + "You got " + quiz.score + " out of " + quiz.questions.length
    overHtml += "<h3> <input type='text' name='userName' id='userName' placeholder='Type Name and press Enter to Submit' /> </h3>"
    oelemenemt.innerHTML = overHtml + "You got " + quiz.score + " out of " + quiz.questions.length + "<h3>Latest Scores</h3>" + listHtml


    var input = document.querySelector('#userName');
    var listItem = document.querySelector('#userName');
    var list = document.querySelector('#result');

    input.addEventListener('change', updateValue);
    function updateValue(event) {

        if (listItem.value.length < 1) return;


        list.innerHTML += '<li>' + listItem.value + "  ---------  " + quiz.score + '</li>';


        // Clear input
        listItem.value = '';

        // Save the list to localStorage
        localStorage.setItem('Players', list.innerHTML);

    };

    // Check for saved list items
    var saved = localStorage.getItem('Players');

    // If there are any saved items, update our list
    if (saved) {
        list.innerHTML = saved;
    }


};

function highScore() {

    // moved to results function
    // helemenemt = document.getElementById("quiz");
    // helemenemt.innerHTML = hScore + "<br>" + localStorage.getItem("Player") + " :   " + quiz.score + " out of " + quiz.questions.length

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




