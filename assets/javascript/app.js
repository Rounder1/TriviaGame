$(document).ready(function(){

    var arrayOfQuestions = [{
        question: "What company invented JavaScript?",
        options: ["Microsoft", "Apple", "Netscape", "Oracle"],
        answer: "Netscape",
        userAnswer: "",
        answerCorrect: false,
        notAnswered: false
    }, {
        question: "Who designed JavaScript?",
        options: ["Brendan Eich", "Grace Hopper", "Douglas Crockford", "Linus Torvalds"],
        answer: "Brendan Eich",
        userAnswer: "",
        answerCorrect: false,
        notAnswered: false
    }, {
        question: "Which of the following is NOT a primitive datatype in JavaScript?",
        options: ["Object", "String", "Double", "Number"],
        answer: "Double",
        userAnswer: "",
        answerCorrect: false,
        notAnswered: false
    }, {
        question: "When was JavaScript released?",
        options: ["1988", "1995", "1998", "2000"],
        answer: "1995",
        userAnswer: "",
        answerCorrect: false,
        notAnswered: false
    }];

    var timeLeft = 16;
    var gameGo = 0;
    var questionNumber = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var questionsNotAnswered = 0;

    // hide one set of divs and show another
    function switchPanel (lastPage, nextPage) {
        $(lastPage).hide();
        $(nextPage).show();
    }

    // pull the question info from the object array and print it to the screen
    function writeQuestion (currentQuestion) {
        console.log("writeQuestion Ran"); 
        $("#full_question").text(arrayOfQuestions[currentQuestion].question);
        $("#question_1").text(arrayOfQuestions[currentQuestion].options[0]);
        $("#question_2").text(arrayOfQuestions[currentQuestion].options[1]);
        $("#question_3").text(arrayOfQuestions[currentQuestion].options[2]);
        $("#question_4").text(arrayOfQuestions[currentQuestion].options[3]);
    }

    // run whenever the player clicks on a question
    function playerClickedQuestion (quest) { 
        clearTimeout(interval);
        console.log("startGameTimer Stopped");
        console.log("interval cleared");
            
        gameGo++;
        console.log("gameGo: " + gameGo);
        timeLeft = 5;
        // grab the text out of the div and save it
        arrayOfQuestions[questionNumber - 1].userAnswer = $(quest).text();
        console.log("This Answer Comes From Question Number at: " + arrayOfQuestions[questionNumber - 1].userAnswer);

        // check to see if the awnser saved matches the right awnser, if so save that info
        if (arrayOfQuestions[questionNumber - 1].userAnswer === arrayOfQuestions[questionNumber -1].answer) {
            arrayOfQuestions[questionNumber - 1].answerCorrect = true;
        }

        // let the user know if they got the question right or wrong
         if (arrayOfQuestions[questionNumber - 1].answerCorrect === true) { 
            $("#right_or_wrong").text("Correct!");
            $("#correct_answer").text("Way to go");
        } else {
            $("#right_or_wrong").text("Incorrect.");
            $("#correct_answer").text("The correct awnser is " + arrayOfQuestions[questionNumber - 1].answer);
        }
                            
        // move on to next question and reset the game timer
        switchPanel("#question_panel", "#question_feedback");
        startGameTimer();
    }


    function startGameTimer () {
        console.log("startGameTimer Running");
        interval = setTimeout(startGameTimer, 1000);
        timeLeft--;
        console.log("Time Left " + timeLeft);

        $("#question_timer").text("Time left to awnser the question: " + timeLeft);

        if (timeLeft === 0) {    
            clearTimeout(interval);
            console.log("interval cleared");
            
            if (gameGo < 7 && gameGo % 2 === 0) {

                gameGo++;
                console.log("gameGo: " + gameGo);
                console.log("Even Number");
                timeLeft = 5;

                $("#right_or_wrong").text("You ran out of time");
                $("#correct_answer").text("The correct awnser is " + arrayOfQuestions[questionNumber - 1].answer);
                console.log("This Answer Comes From Question Number at: " + questionNumber);

                arrayOfQuestions[questionNumber - 1].notAnswered = true;

                switchPanel("#question_panel", "#question_feedback");
                startGameTimer();

            } else if (gameGo < 7 && gameGo % 2 !== 0) {

                gameGo++;
                console.log("gameGo: " + gameGo);
                console.log("Odd Number");
                timeLeft = 16;

                writeQuestion (questionNumber);
                console.log("Question Number at: " + questionNumber);
                questionNumber++;

                switchPanel("#question_feedback", "#question_panel");
                startGameTimer();

            } else {
                switchPanel (".trivia_panel", "#final_score");
                
                for (var i = 0; i < arrayOfQuestions.length; i++) {
                    if (arrayOfQuestions[i].answerCorrect === true) {
                        correctAnswers++;   
                    } else if (arrayOfQuestions[i].notAnswered === true) {
                        questionsNotAnswered++;
                    } else {
                        incorrectAnswers++;
                    }      
                }

                $("#right_answers").text("Answered Right: " + correctAnswers);
                $("#wrong_answers").text("Answered Wrong: " + incorrectAnswers);
                $("#not_answered").text("Did Not Answer: " + questionsNotAnswered);                  
            }
        }
    }



    // On page load hide all the trivia panels and show the player the start panel
    switchPanel (".trivia_panel", "#start_panel");
    console.log("Switch Panel 1"); 

    // start the game 
    $("#start_button_1").click( function() {

        startGameTimer();
        switchPanel ("#start_panel", "#question_panel");
        writeQuestion (questionNumber);
        console.log("Question Number at: " + questionNumber);
        questionNumber++;

    });

    $("#question_1").click( function() {
        playerClickedQuestion("#question_1");
    });


    $("#question_2").click( function() {
        playerClickedQuestion("#question_2");
    });


    $("#question_3").click( function() {
        playerClickedQuestion("#question_3");
    });


    $("#question_4").click( function() {
        playerClickedQuestion("#question_4");
    });

    $("#start_button_2").click( function() {

        timeLeft = 16;
        gameGo = 0;
        questionNumber = 0;
        correctAnswers = 0; 
        incorrectAnswers = 0;
        questionsNotAnswered = 0;
        

        for (var i = 0; i < arrayOfQuestions.length; i++) {
            arrayOfQuestions[i].userAnswer = "";
            arrayOfQuestions[i].answerCorrect = false;
            arrayOfQuestions[i].notAnswered =false;
        }

        startGameTimer();
        switchPanel ("#final_score", "#question_panel");
        writeQuestion (questionNumber);
        console.log("Question Number at: " + questionNumber);
        questionNumber++;
    });

});