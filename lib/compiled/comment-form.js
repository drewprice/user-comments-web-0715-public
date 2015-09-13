'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CommentForm = (function () {
  function CommentForm() {
    _classCallCheck(this, CommentForm);

    this.hideErrors();
    this.hide();

    this.listenForShow();
    this.listenForCancel();
    this.listenForSubmission();
  }

  _createClass(CommentForm, [{
    key: 'hide',
    value: function hide() {
      $('#add_comment').hide();
    }
  }, {
    key: 'hideErrors',
    value: function hideErrors() {
      var errors = [$('#comment_name_error'), $('#comment_email_error'), $('#comment_body_error')];

      errors.forEach(function (errorElement) {
        errorElement.hide();
      });
    }
  }, {
    key: 'listenForShow',
    value: function listenForShow() {
      $('#show_comment_form').click(function () {
        $('#add_comment').slideDown();
      });
    }
  }, {
    key: 'listenForCancel',
    value: function listenForCancel() {
      $('#cancel').click(function () {
        $('#add_comment').hide();
      });
    }
  }, {
    key: 'listenForSubmission',
    value: function listenForSubmission() {
      $('#add_comment').submit(function (event) {
        event.preventDefault();

        var comment = Comment.fromForm(this, event.timeStamp);

        if (comment.valid()) {
          comment.appendToPosts();

          this.reset();
        } else {
          comment.showErrors();
        }
      });
    }
  }]);

  return CommentForm;
})();
