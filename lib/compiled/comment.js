'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Comment = (function () {
  function Comment(name, email, body) {
    var date = arguments.length <= 3 || arguments[3] === undefined ? Date.now() : arguments[3];

    _classCallCheck(this, Comment);

    this.name = name;
    this.email = email;
    this.body = body;
    this.date = date instanceof Date ? date : new Date(date);
  }

  _createClass(Comment, [{
    key: 'valid',
    value: function valid() {
      return this.validName() && this.validEmail() && this.validBody();
    }
  }, {
    key: 'validName',
    value: function validName() {
      return this.name.length >= 3;
    }
  }, {
    key: 'validEmail',
    value: function validEmail() {
      // TODO: Better regex
      var emailRegex = /^\w+[\w\._-]+@[\w_-]+\.[a-z]+$/i;

      return emailRegex.test(this.email);
    }
  }, {
    key: 'validBody',
    value: function validBody() {
      return Boolean(this.body);
    }
  }, {
    key: 'showErrors',
    value: function showErrors() {
      if (!this.validName()) this.showNameError();
      if (!this.validEmail()) this.showEmailError();
      if (!this.validBody()) this.showBodyError();
    }
  }, {
    key: 'showNameError',
    value: function showNameError() {
      $('#comment_name_error').show();
    }
  }, {
    key: 'showEmailError',
    value: function showEmailError() {
      $('#comment_email_error').show();
    }
  }, {
    key: 'showBodyError',
    value: function showBodyError() {
      $('#comment_body_error').show();
    }
  }, {
    key: 'toHTMLString',
    value: function toHTMLString() {
      return '<div class="new_comment">' + '<span class="name">' + this.name + ' :: ' + '</span>' + '<span class="email">' + this.email + ' :: ' + ' </span>' + '<span class="date">' + this.date.toDateString() + '</span>' + '<p class="comment_body">' + this.body + '</p>' + '</div>';
    }
  }, {
    key: 'appendToPosts',
    value: function appendToPosts() {
      $('#posts').append(this.toHTMLString());
    }
  }], [{
    key: 'fromForm',
    value: function fromForm(form, date) {
      form = $(form);

      var name = form.find('#comment_name').val();
      var email = form.find('#comment_email').val();
      var body = form.find('#comment_body').val();

      return new Comment(name, email, body, date);
    }
  }]);

  return Comment;
})();
