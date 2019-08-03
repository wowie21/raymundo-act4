$(function(){
    //Do crazy stuffs here ...
     var triviaButton = $('#get-trivia');
    var triviaList = $('.trivia-list');
    var loading = $('.loading');
    var countTrivia = 0;

    loading.hide();
    triviaButton.click(function(e){
        e.preventDefault();
        getTrivia();
    })

    const getTrivia = async function(){
        loading.show();
        try {
            var trivia = await RANDOM_SERVICE.get();
            var triviaText = trivia.text;
            var triviaNumber = trivia.number;
            var triviaByYear = await getByYear(triviaNumber);
            
            generateTrivia(triviaText, triviaByYear.text);
            
            if(countTrivia == 5){
                loading.hide();
                triviaButton.attr('disabled', true);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    function getByYear(number){
        return $.ajax({
            url : `http://numbersapi.com/${number}/year?json`,
        });
    }

    function generateTrivia(text, textByYear){
        
        countTrivia++;

        var sameTrivia = `<li>
                            <h1>Trivia ${countTrivia}</h1>
                            <p>${text}</p>
                         </li>`;

        var notSameTrivia = `<li>
                                <h1>Trivia ${countTrivia}</h1>
                                <p>${text}</p>
                                <p>${textByYear}</p>
                            </li>`;

        if(countTrivia <= 5){
            if(text === textByYear){
                triviaList.append(sameTrivia);
            }
            else{
                triviaList.append(notSameTrivia);
            }
        }
        else {
            triviaButton.attr('disabled', true);
        }
    }
})