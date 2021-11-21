/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
]


$(document).ready(function() {

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
     <p class="tweet-text">${tweet.content.text}</p>
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
  
  // function to render tweet & prepend to prev. tweets 
  const renderTweets = function(tweets) {
    let $tweets = $('.previous-tweets');
  
    tweets.forEach(function(tweet) {
      $tweets.prepend(createTweetElement(tweet));
    });
  };
  // call the render tweets function 
  renderTweets(tweetData);
  
  
  $('form').on("submit", function(event) {
    // prevent default form submission behaviour (page refresh)
    event.preventDefault();
    // console.log("success! refresh prevented");
    // above message prints to the console in the browser

    // if no text in textarea, alert user that there's not text 
    if($("#tweet-text").val().length === 0) {
      alert("Error: No text in body.");
      return;
    }
    // if characters exceed 140, alert user that tweet is too long
    if($("#tweet-text").val().length > 140) {
      alert("Error: This tweet is too long!");
      return;
    }


    
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: $(this).serialize()
    }); // above request fails 
  });
  
  // function responsible for fetching tweets from tweets page
  const loadTweets = function() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets",
      dataType: "json",
      success: function(data){
        // if get req succeeds --> render tweets 
        renderTweets(data);
      }
    });
  };
  loadTweets();
});


