var app = new App();

$(document).ready(function() {

  app.init();

  $('.submit').click(function() {
    app.handleSubmit();
    app.fetch();
  });

  $('.username').click(function() {
    $(this).trigger(app.handleUsernameClick());
  });
    
  $('#roomSelect').change(function() {
    var selected = $(this).find('option:selected');
    var roomName = selected.val();
    console.log(roomName);
    //app.renderRoom(roomName);
  });


  // $( "input[type='text']" ).change(function() {
  //   // Check input( $( this ).val() ) for validity here
  // });
  // setInterval(app.fetch, 1000);
});
