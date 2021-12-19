/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = [];

$(document).ready(function() {

  // escape function to prevent XSS (cross-scripting) attacks 
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // function to create a DOM element from tweetData object
  const createTweetElement = function(tweet){

    let $tweet = `<article class="tweet">
    <header class="tweet-header">
     <div class="avatar">
      <img class="tweeter-icon" src="${tweet.user.avatars}">
      <p class="username">${tweet.user.name}</p>
     </div>
     <p class="tweeter-handle">${tweet.user.handle}</p>
    </header>
    <div class="tweet-content">
     <p class="tweet-text">${escape(tweet.content.text)}</p> 
    </div>
    <footer class="tweet-footer">
     <p class="post-date">
     ${timeago.format(tweet.created_at)}
     </p>
     <div class="footer-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
     </div>
    </footer>
  </article>`
  return $tweet;
  }

  // function to render tweet & prepend (add to top of list) to prev. tweets 
  const renderTweets = function(tweets) {
    $('.previous-tweets').empty();
    // let $tweets = $('.previous-tweets');
  
    tweets.forEach(function(tweet) {
      // append --> disp in reverse chronological order (last to first)
      let $tweetElement = createTweetElement(tweet);

      $('.previous-tweets').append(createTweetElement(tweet));
    });
  };

  //call the render tweets function 
  // renderTweets(tweetData);




  $('form').on("submit", function(event) {
    // prevent default form submission behaviour (page refresh)
    event.preventDefault();

    // if no text in textarea, alert user that there's no text 
    if($("#tweet-text").val().length === 0) {
      $('#error').slideDown("slow", function() {
        $('#errVisible').html("Error: The textarea is empty!");
      });
      // add setTimeout for 3s to hide error message once user has acknowledged it 
      setTimeout(() => {
        $('#error').slideUp("slow")
      }, 3000);
      return;
    }
    // if characters exceed 140, alert user that tweet is too long
    if($("#tweet-text").val().length > 140) {
      $('#error').slideDown("slow", function() {
        $('#errVisible').html("Error: Character Limit Exceeded!");
      });
      setTimeout(() => {
        $('#error').slideUp("slow")
      }, 3000);
      return;
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
      success: function() {
        // converts jquery elem to js and resets the form once tweet has been successfully submitted 
        $('.container .new-tweet form')[0].reset();
        // resets counter to 140 characters
        $('.counter').text(140);
        loadTweets();
      }
    })
  });
  

  // function responsible for fetching tweets from tweets page
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: function(data){
        console.log("data", data);
        // if get req succeeds --> render tweets 
       renderTweets(data);
      }
    });
  };
  loadTweets();
});

// load tweets at start
// if loadtweet funciton = false, inside run loadtweets,
// after loads set loadtweets to true, once set - shouldnt run again 
