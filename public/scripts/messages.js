

$(document).ready(function() {

  // Fetch and display users who have exchanged messages
  $.get('/api/messages/user-list')
    .then(users => {
      populateUsersSidebar(users);
    })
    .catch(err => {
      console.log('Error getting user list:', err.message);
    });

  // Event handler for user button click
  $('body').on('click', '.user-btn', function() {
    const selectedUserId = $(this).data('user-id');
    // loggedInUserId is fetched globally through script on messages page
    fetchAndDisplayMessages(selectedUserId, loggedInUserId);
  });

  const fetchAndDisplayMessages = function(selectedUserId, loggedInUserId) {
    $.get(`/api/messages/${loggedInUserId}/${selectedUserId}`)
      .then(messages => {
        displayReceivedMessages(messages);
      })
      .catch(err => {
        console.log('Error fetching messages:', err.message);
      });
  };

  // Event handler for reply button
  $('body').on('click', '.reply-btn', function(event) {
    event.preventDefault();
    $('.send-message').show();
  });

  // Event handler for send message form
  $('.send-message form').on('submit', function(event) {
    event.preventDefault();

    const messageContent = $('#message-content').val().trim();
    const receiverId = $('.reply-btn').data('sender-id');
    const productId = $('.reply-btn').data('product-id');

    if (messageContent) {
      sendMessage(messageContent, loggedInUserId, receiverId, productId);
    } else {
      alert('Please enter a message.');
    }
  });
});

const populateUsersSidebar = function(users) {
  const userBtnsContainer = $('.user-btns');
  userBtnsContainer.empty();

  users.forEach(user => {
    const userBtn = $('<a>').addClass('btn btn-danger user-btn')
      .attr('data-user-id', user.id)
      .text(user.username);
    userBtnsContainer.append(userBtn);
  });
};

// FUnction to display the messages in the .message.received container on the messages page
const displayReceivedMessages = (messages) => {
  const messagesContainer = $('.message-received');
  messagesContainer.empty();

  messages.forEach(msg => {
    const messageElement = $(`
      <div class="mb-3 full-msg">
      <div class="product-info">
        <img src="${msg.thumbnail_photo_url}" alt="Product Image">
        <p>${msg.sender_id.username} says:</p>
        </div>
        <div class="msg-content">
        <div class="rec-msg">
          <p>${msg.content}</p>
        </div>
        <form action="/messages">
          <button class="btn btn-success reply-btn" data-sender-id="${msg.sender_id}" data-product-id="${msg.product_id}">Reply</button>
        </form>
        </div>
      </div>
    `);
    messagesContainer.append(messageElement);
    // console.log(msg);
  });
};

const sendMessage = function(content, senderId, receiverId, productId) {
  $.post('/api/messages', { content, senderId, receiverId, productId })
    .then(newMessage => {
      displaySentMessage(newMessage);
      $('#message-content').val('');
      $('.send-message').hide();
    })
    .catch(err => console.log('Error sending message:', err.message));
};

const displaySentMessage = function(message) {
  const sentMessageContainer = $('.message-collection');
  const newMessageElement = $('<div>').addClass('message mb-3')
    .append($('<img>').attr('src', message.thumbnail_photo_url))
    .append($('<div>').addClass('rec-msg')
      .append($('<p>').text(message.content)));
  sentMessageContainer.append(newMessageElement);
};




