class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.username = window.location.href.split('=')[1];
    this.roomName = {};
  }
  init() {
    this.fetch();
    //this.renderMessage(storage);
  }
  send(message) {
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('Success', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Failed');
      }
    });
  }
  fetch() {
    $.get(this.server, data => {
      var filteredData = data.results.filter(obj => obj.text);
      filteredData.forEach(obj => {
        this.renderMessage(obj);
        this.roomName[obj.roomname] = 1;
      });
      for (var key in this.roomName) {
        this.renderRoom(key);
      }  
       
    });

  }
  clearMessages() {
    $('#chats').html(' ');
  }
  renderMessage(obj) {
    // var escapeRegExp = function (string) {
    //   if (string) {
    //     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    //   } else {
    //     return '';
    //   }
    // }; 
    var escapeRegExp = function (s) {
      if (s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
      } else {
        return '';
      }
    };

    var time = obj.createdAt;
    var text =
    `<div class="comment">
      <div class="username">${escapeRegExp(obj.username)}</div>
      <div class="text">${escapeRegExp(obj.text)}</div>
      <div class="timestamp">${time}</div>
    </div>`;

    $('#chats').append(text);
  }
  renderRoom(roomName) {
    var room = `<option class="seletedRoom">${roomName}</option>`;
    $('#roomSelect').append(room);
  }
  handleUsernameClick() {
  }
  handleSubmit() {
    const message = {};
    message.username = this.username;
    message.text = $('#message').val();
    this.send(message);
    // this.renderMessage(message);
    $('#message').val('');
  }
}
