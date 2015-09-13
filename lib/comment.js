class Comment {
  constructor(name, email, body, date = Date.now()) {
    this.name  = name;
    this.email = email;
    this.body  = body;
    this.date  = date instanceof Date ? date : new Date (date);
  }

  valid() {
    return this.validName() && this.validEmail() && this.validBody();
  }

  validName() {
    return this.name.length >= 3
  }

  validEmail() {
    // TODO: Better regex
    var emailRegex = /^\w+[\w\._-]+@[\w_-]+\.[a-z]+$/i;

    return emailRegex.test(this.email)
  }

  validBody() {
    return Boolean(this.body);
  }

  showErrors() {
    if (!this.validName())  this.showNameError();
    if (!this.validEmail()) this.showEmailError();
    if (!this.validBody())  this.showBodyError();
  }

  showNameError() {
    $('#comment_name_error').show();
  }

  showEmailError() {
    $('#comment_email_error').show();
  }

  showBodyError() {
    $('#comment_body_error').show();
  }

  toHTMLString() {
    return '<div class="new_comment">' +
      '<span class="name">' +
        this.name + ' :: ' +
      '</span>' +
      '<span class="email">' +
        this.email + ' :: ' +
      ' </span>' +
      '<span class="date">' +
        this.date.toDateString() +
      '</span>' +
      '<p class="comment_body">' +
        this.body +
      '</p>'+
    '</div>';
  }

  appendToPosts() {
    $('#posts').append(this.toHTMLString());
  }

  static fromForm(form, date) {
    form = $(form);

    let name  = form.find('#comment_name').val();
    let email = form.find('#comment_email').val();
    let body  = form.find('#comment_body').val();

    return new Comment(name, email, body, date)
  }
}
