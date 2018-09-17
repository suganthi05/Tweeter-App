$(document).ready(function() {

  const tweetData = [];

  const timeSince = (createdTime) => {

    const currentTime = Date.now();
    const timeDiff  = currentTime - createdTime;
    const diffMinutes = Math.floor((timeDiff / 1000) / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 365) {
      return `long time ago`;
    } else if (diffHours >= 24) {
      if (diffDays === 1) {
        return `a day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    } else if (diffMinutes >= 60) {
      if (diffHours === 1) {
        return `an hour ago`;
      } else {
        return `${diffHours} hours ago`;
      }
    } else {
      if (diffMinutes < 1) {
        return `just now`;
      } else if (diffMinutes === 1) {
        return `a minute ago`;
      } else {
        return `${diffMinutes} minutes ago`;
      }
    }
    
  };

  const createTweetHeader = (tweetData) => {
    const $header = $("<header>")
      .append($("<img class='avatar' src='" + tweetData.user.avatars.small + "'>"))
      .append($("<div class='username'>").text(tweetData.user.name))
      .append($("<div class='handle'>").text(tweetData.user.handle));
    return $header;
  };

  const createTweetBody = (tweetData) => {
    const $body = $("<section>")
      .text(tweetData.content.text);
    return $body;
  };

  const createTweetFooter = (tweetData) => {
    const $footer = $("<footer>")
      .text(timeSince(tweetData.created_at))
      .append($("<span class='icons'>")
      .append($("<img src='/images/flag-blue.png'>"))
      .append($("<img src='/images/retweet-blue.png'>"))
      .append($("<img src='/images/like-blue.png'>"))
      );
    return $footer;
  };
  
  const createTweetElement = (tweetData) => {
    const $tweet = $("<article class='tweet'>")
      .append(createTweetHeader(tweetData))
      .append(createTweetBody(tweetData))
      .append(createTweetFooter(tweetData));
    return $tweet;
  };

  const sortNewestFirst = (a, b) => {
    return a.created_at - b.created_at;
  };

  const renderTweets = (tweetsArr) => {
    $("#tweet-container").empty();
    const sortedTweets = tweetsArr.sort(sortNewestFirst);
    sortedTweets.forEach((tweetObj) => {
      const tweet = createTweetElement(tweetObj);
      $("#tweet-container").prepend(tweet);
    });
  };

  renderTweets(tweetData);

  function loadTweets() {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function(tweet){
        renderTweets(tweet);
      }
    });
  }

  loadTweets();

  $("#compose-tweet").on("submit", function(event) {
    event.preventDefault();
    let maxCount = 140;
    let currentValue = maxCount - $('textarea').val().trim().length;
    if (maxCount === currentValue) {
      $("#message").html("Tweet cannot be empty!");
      $('#message').addClass("redFont");
    } else if (currentValue < 0) {
      $("#message").html("Tweet is too Long!");
      $('#message').addClass("redFont");
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function() {
          $('.tweet-container').empty();
          $('textarea').val('');
          $('.counter').html('140');
        }
      });
      $('.tweet-container').empty();
      $('textarea').val('');
      $('.counter').html('140');
      $("#message").html("");
      loadTweets();
    }
  });

  $('.nav-button').click(function() {
    $('body').animate({scrollTop:0}, 'slow');
    $('.new-tweet').slideToggle("slow", function(){
      $("textarea").focus();
    });
  });

  $('textarea').bind('focus blur', function (){
    $(this).toggleClass('button-focus');
  });

});



