// Client facing scripts here

$(document).ready(function() {
  $('#chatForm').on('submit', function(event) {
    // Prevent the form from submitting via the browser
    event.preventDefault();
    // Get the message from the textarea
    const message = $('textarea[name="msg"]').val();

    $.ajax({
      type: 'POST',
      url: '/products',
      data: {msg: message}
    })
      .then(function(response) {
        // Handle success - clears the form
        $('textarea[name="msg"]').val('');
        console.log('Message sent:', response);
      })
      .catch(function(error) {
        // Handle error
        console.log('Error sending message:', error);
      });
  });

  // Function to open the chat form
  window.openForm = function() {
    document.getElementById("myForm").style.display = "block";
  };

  // Function to close the chat form
  window.closeForm = function() {
    document.getElementById("myForm").style.display = "none";
  };

});

