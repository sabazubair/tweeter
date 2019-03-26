/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

$(document).ready(function() {
  $("textarea").focus(function(){

  $(".hello").show();
  }).blur(function(){
    $(".hello").hide();
  });

  $("textarea").focus();

  $(".hello").hide();

//   const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
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
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

//OBTAINED FROM STACK OVERFLOW
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
//added an escape function on the tweet content area so that html remains protected.
  function createTweetElement(tweet){
    return `<article class="tweet">
          <header>
            <img src="${tweet.user.avatars.small}" height="60px" width="60px"/>
            <h3> ${tweet.user.name} </h3>
            <h6> ${tweet.user.handle} </h6>
          </header>
          <p> ${escape(tweet.content.text)} </p>
          <footer>
            <h6> ${timeSince(tweet.created_at)} </h6>
            <i class="fas fa-heart"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-flag"></i>
          </footer>
        </article>`;
  }

  function renderTweets(tweets){
    $('.tweets').empty();
    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      console.log($tweet);
      $('.tweets').prepend($tweet);
    });
  }

  function loadTweets (){
    $.ajax({
      url: '/tweets',
      type: "GET"
    })
    .then(renderTweets)
  }

  loadTweets();

  $('form').on('submit', function (event) {
    event.preventDefault();
    var textarea = $("textarea")
    if(textarea.val().length === 0){
      $(".c-validation").text("Please create a tweet. :-)")
      $(".c-validation").slideDown()
    } else if (textarea.val().length > 140){
      $(".c-validation").slideDown()
      $(".c-validation").text("Brevity is the soul of wit. Please keep your message to 140 characters!")
    } else{
      $(".c-validation").hide()
      $.ajax({
        url: '/tweets',
        type: "POST",
        data: $(this).serialize()
      })
      .then(loadTweets).then(function(){
        textarea.val("").trigger("input")
      })
    }
  })

  $(".button").on("click", function(event){
  $(".new-tweet").slideToggle("medium");

  $("textarea").focus();
  })
});
