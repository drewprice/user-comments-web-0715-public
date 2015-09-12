'use-strict';

$(document).ready(function(){
  // functions are called inside the document ready
  hideErrors();
  hideForm();
  addCommentListener();
  cancelListener();
  submitCommentListener();
});

// write your functions out here

function hideErrors() {
  var errors = [$('#com-name-error'), $('#com-email-error'), $('#comment-error')];

  errors.forEach(function (errorElement) {
    errorElement.hide();
  })
}

function hideForm() {
  $('#add-comment').hide();
}

function addCommentListener() {
  $('#show-comment-form').click(function () {
    $('#add-comment').slideDown();
  });
}

function cancelListener() {
  $('#cancel').click(function () {
    $('#add-comment').hide();
  });
}

function submitCommentListener() {
  $('input[type="submit"]').click(function(e) {
    e.preventDefault();

    var name    = $('#comment-name').val();
    var email   = $('#com-email').val();
    var comment = $('#comment').val();

    if (valid(name, email, comment)) {
      $('#posts').append(buildHTML(name, email, comment));
    }
  });
}

function buildHTML(name, email, comment) {
  return '<div class="newcomment">' +
    '<span class="name">' +
      name +
    '</span>' +
    '<span class="email">' +
      email +
    '</span>' +
    '<span class="date">09/03/2012</span>' +
    '<p class="comment">' +
      comment +
    '</p>'+
  '</div>';
}

function valid(name, email, comment) {
  return nameValid(name) && emailValid(email) && commentValid(comment)
}

function nameValid(name) {
  if (name.length < 3) {
    $('#com-name-error').show();
    return false;
  }

  return true;
}

function emailValid(email) {
  var emailRegex = /^\w+[\w\._-]+@[\w_-]+\.[a-z]+$/i

  if (!emailRegex.test(email)) {
    $('#com-email-error').show();
    return false;
  }

  return true;
}

function commentValid(comment) {
  if (!comment) {
    $('#comment-error').show();
    return false;
  }

  return true;
}
