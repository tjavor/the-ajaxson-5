

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    //if (userinput !== 5) {
    //    $("#nogif").attr("hidden", false);
    //    return false;
    //};

    // get the user's input text from the DOM
    var searchQuery = $("#tag").val(); // TODO should be e.g. "dance"
    var userinput = $("#userinput").val();
    var userinput = parseInt(userinput);

    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : searchQuery // TODO should be e.g. "jackson 5 dance"
    };

    if (userinput === 5) {
        var searchQuery = $("#tag").val();
        var params = {
            api_key: "dc6zaTOxFJmzC",
            tag : searchQuery // TODO should be e.g. "jackson 5 dance"
        };
    // make an ajax request for a random GIF
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/random?api_key=", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        beforeSend: function() {
            $("#gif").attr("hidden", true);
            $("#loading").attr("hidden", false);
        },
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(searchQuery);
            console.log(response);

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
            var queryUrl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + searchQuery;
            var giphyUrl = response.data.image_url;
            console.log(queryUrl);
            console.log(giphyUrl);
            $("#gif").attr("src", giphyUrl);
            $("#gif").attr("hidden", false);
            $("#loading").attr("hidden", true);
            $("#nogif").attr("hidden", true);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // TODO
    // give the user a "Loading..." message while they wait

} else {
    $("#gif").attr("hidden", true);
    $("#nogif").attr("hidden", false);
}
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
