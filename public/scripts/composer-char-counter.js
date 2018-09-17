$(document).ready(function() {

  let currCharvalue = 0;
  const allowedChar = 140;
  let remainChar =0;

  $('.new-tweet textarea').on('input',function() {

    currCharvalue = this.value.length;
    remainChar = allowedChar - currCharvalue;
    
    $(".counter").text(remainChar);
    $("#message").html("");

    if(currCharvalue >140){
      $('.counter').addClass("redFont");
      $("#message").html("Tweet is too Long!");
      $('#message').addClass("redFont");
    } else {
      $('.counter').removeClass("redFont");
      $("#message").html("");
    }

  });

});