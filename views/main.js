var allQuestions = null;
var xmlhttp = new XMLHttpRequest(); //AJAX, gets data from the server without refreshing the whole page
xmlhttp.onreadystatechange = function () {
    allQuestions = JSON.parse(this.responseText);

    var Page = -1; //Page number, starts at -1 for title page
    var totalScore = 0; //counts users score
    var review = false; //used to navigate screens

    $(document).ready(function () {
        //Hiding the quiz at the launch and waiting for the user to click the start button
        $("#quiz").hide();
        $("#explain").hide();
        $("#nextBtn").html("Click here to Start Quiz");
        $("#end").hide();


        //onClick function for the next button
        $("#nextBtn").on('click', (e) => {
            e.preventDefault();

            //Setting the 'nextBtn' div to say "Next Question"
            $("#nextBtn").html("Next Question");

            //Getting the currently selected answer
            var answerArray = $("#myForm").serializeArray();

            //if review is true
            if (review) {

                //Checking if the current answer == the value in answerArray
                if (answerArray[0].value == allQuestions[Page].answerIndex) {
                    totalScore++;
                }

                //Setting review to false so the quiz can move to the next question
                review = false; 
            }

            //if review is false
            else {
                //Load in the content div
                $("#content").fadeIn('slow',() => {
                    //Increasing current page
                    Page++;
                    //checks if the quiz is done
                    if (Page == allQuestions.length) {
                        // quiz is over, shows final score
                        $("#scores").show();
                        $("#quiz").hide();
                        $("#nextBtn").hide();
                        $("#explain").hide();
                        $("#end").show();
                        $("#scores").html("Score: " + totalScore + "/" + allQuestions.length);
                    }
                    else {
                        review = true; // turn review on for next question
                        var thisQ = allQuestions[Page];
                        // display a question, emptying the answers part so only the radio buttons for that questio show up
                        $("#quiz").show();
                        $("#explain").show();
                        $("#current-question").html("Question: " + Page + "/" + allQuestions.length);
                        $("#scores").html("Score: " + totalScore + "/" + allQuestions.length);
                        $("#questions").html(thisQ.stem);
                        $("#answers").empty();
                        var choiceArray = thisQ.options;
                        //Making the page show the radio buttons
                        for (var i = 0; i < choiceArray.length; i++) {
                            $("#answers").append('<div class="radio a' + i + '"><input type="radio" name="q' + Page + '" value="' + i + '"> ' + choiceArray[i] + '</div>');
                        }
                    }

                });
            }
        })
    });
}
xmlhttp.open("GET", "questions.json", true); //AJAX
xmlhttp.send();