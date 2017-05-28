var app = new App();

$(document).ready(function() {

  app.init();

  $('#send').submit(function(event) {
    app.handleSubmit();
    event.preventDefault();
  });

  $('#newRoom').submit(function(event) {
    let message = {};
    message.roomname = $('#newRoomInput').val();
    app.send(message);
    $(`#roomSelect option[value="${escapeRegExp(message.roomname)}"]`).attr('selected', 'selected');
    app.clearMessages();
    $('#newRoomInput').val(' ');
    event.preventDefault();
  });

  $('#chats').click('.comment .username', function(event) {
    app.handleUsernameClick(event.target);
  });
    
  $('#roomSelect').change(function() {
    app.refreshRoom();
  });

  $('.refresh').click(function() {
    app.refreshRoom();
  });

});
