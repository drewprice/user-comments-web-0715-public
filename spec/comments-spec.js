'use-strict';
describe('Loading the page', function() {

  var commentForm = new CommentForm;

  beforeEach(function() {
    setFixtures('<section id="comments"><h1>User Comments</h1><div id="posts"><div class="new_comment"><span class="name">Lisa Gould</span><span class="email">lisa.gould7684@ymail.com</span><span class="date">09/03/2012</span><p class="comment_body">Great reading! Thank you Econ News... I would like to see more articles from Chef Boullion. I\'m enjoying the keylime pie recipe with friends.</p></div></div><button id="show_comment_form" onclick="#add_comment">add comment_body</button><form id="add_comment" action="#" method="post"><label for="comment_name">Name</label><br><input type="text" id="comment_name" name="comment_name"><br><span id="comment_name_error">Name must be more than 3 characters!</span><br><label for="comment_email">Email</label><br><input type="text" id="comment_email" name="comment_email"><br><span id="comment_email_error">Must be a valid email!</span><br><label for="comment_name">Comment</label><br><textarea id="comment_body" name="comment_body" rows="5"></textarea><br><span id="comment_body_error">Comment text required!</span><br><input type="submit" value="submit"><input id="cancel" type="reset" value="cancel"></form></section>');
    $('form').submit(function(e){ e.preventDefault(); });
  });

  it('#hideErrors should hide all errors when the page loads', function() {
    commentForm.hideErrors();
    expect($('#comment_name_error').css('display')).toBe('none');
    expect($('#comment_email_error').css('display')).toBe('none');
    expect($('#comment_body_error').css('display')).toBe('none');
  });

  it('#hide should also hide the form until you click add comment_body', function() {
    commentForm.hide();
    expect($('form#add_comment').css('display')).toBe('none');
  });

  it('#listenForShow should display the form when you click add comment_body', function() {
    commentForm.hide();
    commentForm.listenForShow();
    try {
      $('#show_comment_form').click();
    }
    catch(err) {
      // stops error from blowing up test
    }
    expect($('form#add_comment').css('display')).not.toBe('none');
  });

  it('#listenForCancel should hide form when cancel is pressed', function() {
    commentForm.listenForCancel();
    $('#cancel').click();
    expect($('form#add_comment').css('display')).toBe('none');
  });

  describe('Comment submission', function() {
    beforeEach(function(){
      new CommentForm;
    });

    describe('Displays errors with invalid inputs', function() {
      it('should display the name error with a name less than 3 characters', function() {
        $('#comment_name').val('t');
        $('input[type="submit"]').last().click();
        expect($('#comment_name_error').css('display')).not.toBe('none');
      });

      it('should display the email error with an invalid email', function() {
        $('#comment_name').val('taco');
        $('#comment_email').val('email');
        $('input[type="submit"]').last().click();
        expect($('#comment_email_error').css('display')).not.toBe('none');
      });

      it('should display the comment_body error when no comment_body is given', function() {
        $('#comment_name').val('taco');
        $('#comment_email').val('taco@email.com');
        $('input[type="submit"]').last().click();
        expect($('#comment_body_error').css('display')).not.toBe('none');
      });
    });

    it('should display the user post when properly submitted', function() {
      $('#comment_name').val('el taco');
      $('#comment_email').val('taco@email.com');
      $('#comment_body').val('I\'m trizzolllllllin!');
      $('input[type="submit"]').last().click();
      expect($('.new_comment').length).toBe(2);
    });
  });
});
