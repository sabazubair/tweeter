$(document).ready(function() {
  $("textarea").on("input", function(){
  var textarea = $(this);
  var counterValue = 140 - textarea.val().length;
  textarea.siblings(".counter").text(counterValue);
    if(counterValue < 0){
      textarea.siblings(".counter").css('color', 'red')
    }else{
      textarea.siblings(".counter").css('color', 'black')
    }
})
});
