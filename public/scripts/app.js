$(() => {

const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

  const timeSince = (time) => {
    const curTime = Date.now();
    const timeDiff = curTime - time;//diff-timeDiff --> diff = now-time
    const diffMinutes = Math.floor((timeDiff / 1000) / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 365) {
      return `long time ago`;
    } else if (diffHours > 23) {
      if (diffDays === 1) {
        return `a day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    } else if (diffMinutes > 59) {
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
    let currentValue = maxCount - $('textarea').val().length;
    console.log(currentValue);
    if(maxCount === currentValue) {
      alert('Tweet cannot be empty!');
    } else if (currentValue < 0) {
      alert('Tweet is too Long!');
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
        success: function() {
          $('.tweet-container').empty();
          $('textarea').val('');
          $('.counter').html('140');
          loadTweets();
        }
      });
  }

  });
});



