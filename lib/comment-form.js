class CommentForm {
  constructor() {
    this.hideErrors();
    this.hide();

    this.listenForShow();
    this.listenForCancel();
    this.listenForSubmission();
  }

  hide() {
    $('#add_comment').hide();
  }

  hideErrors() {
    var errors = [$('#comment_name_error'), $('#comment_email_error'), $('#comment_body_error')];

    errors.forEach(function (errorElement) {
      errorElement.hide();
    })
  }

  listenForShow() {
    $('#show_comment_form').click(function () {
      $('#add_comment').slideDown();
    })
  }

  listenForCancel() {
    $('#cancel').click(function () {
      $('#add_comment').hide();
    })
  }

  listenForSubmission() {
    $('#add_comment').submit(function(event) {
      event.preventDefault();

      var comment = Comment.fromForm(this, event.timeStamp)

      if (comment.valid()) {
        comment.appendToPosts()

        this.reset()
      } else {
        comment.showErrors()
      }
    });
  }

}
