class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.username = window.location.href.split('=')[1];
    this.roomname = {};
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
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: {limit: 1000, order: '-createdAt'},
      success: (data) => {
        data.results.filter(obj => obj).forEach(obj => {
          this.renderMessage(obj);
          this.roomname[obj.roomname] = 1;
        });
        for (let key in this.roomname) {
          this.renderRoomList(key);
        } 
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Failed');
      }
    });
  }
  clearMessages() {
    $('#chats').html(' ');
  }
  renderMessage(obj) {
    let time = obj.createdAt;
    let text =
    `<div class="comment">
      <div class="username">${escapeRegExp(obj.username)}</div>
      <div class="text">${escapeRegExp(obj.text)}</div>
      <div class="timestamp">${time}</div>
    </div>`;

    $('#chats').append(text);
  }
  renderRoomList(roomName) {
    let room = `<option class="seletedRoom" value="${escapeRegExp(roomName)}">${escapeRegExp(roomName)}</option>`;
    $('#roomSelect').append(room);
    return room;
  }
  renderRoom(selection) {
    $.ajax({
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      data: {limit: 1000, order: '-createdAt'},
      success: (data) => {
        let array = data.results;
        if (selection !== 'Select a room') {
          array = array.filter(obj => {
            return obj.roomname === selection;
          });
        }
        array.forEach(obj => this.renderMessage(obj));
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('Failed');
      }
    });
  }
  handleUsernameClick(div) {
    var text = $(div).text();
    $(`.username:contains(${text})`).parent().toggleClass('friend');
  }
  handleSubmit() {
    const message = {};
    message.username = this.username;
    message.text = $('#message').val();
    message.roomname = $('#roomSelect').find('option:selected').val();
    console.log(message.roomname);
    this.send(message);
    // this.renderMessage(message);
    $('#message').val('');
  }
  refreshRoom() {
    var selected = $('#roomSelect').find('option:selected').val();
    app.clearMessages();
    app.renderRoom(selected);
  }
}

let escapeRegExp = function (s) {
  
  if (s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  } else {
    return '';
  }
};

