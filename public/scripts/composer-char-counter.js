$(document).ready(function() {
var currCharvalue = 0;
const allowedChar = 140;
var remainChar =0;
  $('.new-tweet textarea').on('input',function(){
    console.log("second function");
  currCharvalue = this.value.length;
  remainChar = allowedChar - currCharvalue;
  $(".counter").text(remainChar);
  if(currCharvalue >140){
    $('.counter').addClass("redFont");
  }
  else{
    $('.counter').removeClass("redFont");
  }
 });
});