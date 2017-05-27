var app = new App();

$(document).ready(function() {

  app.init();

  $('#send').submit(function(event) {
    app.handleSubmit();
    //setTimeout(app.fetch.bind(app), 2000);
    event.preventDefault();
  });

  $('.username').click(function() {
    $(this).trigger(app.handleUsernameClick());
  });
    
  $('#roomSelect').change(function() {
    app.refreshRoom();
  });

  $('.refresh').click(function() {
    app.refreshRoom();
  });


  // $( "input[type='text']" ).change(function() {
  //   // Check input( $( this ).val() ) for validity here
  // });
  // setInterval(app.fetch, 1000);
});
