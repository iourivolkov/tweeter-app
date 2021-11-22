// responsible for character counter feature

$(document).ready(function(){

  $("#tweet-text").keyup(function() {
    $(".counter").text((140 - $(this).val().length));
    if($(this).val().length > 140) {
      $('.counter').css('color', 'red');
    }
  });

});











