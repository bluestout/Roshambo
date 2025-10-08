$( document ).ready(function() {
$('.data-dropdown-content a').on('click', function(){
  $('.data-dropdown-content').removeClass('selected-actived');
  $(this).parent().addClass('selected-actived');
  $(".data-dropdown-content-inner").hide();
    $(this).parent().find(".data-dropdown-content-inner").toggle();
});
});
