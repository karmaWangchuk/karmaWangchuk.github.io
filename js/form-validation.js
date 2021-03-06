localStorage.setItem('stat',true)

function validate() {

  localStorage.setItem('stat',false)

  jQuery.validator.addMethod("phoneGR", function(value, element) {
    // allow any non-whitespace characters as the host part
    return /^(((((((00|\+)[ \-\/]?)|0)[1-9][0-9]{1,4})[ \-\/]{0,3}?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-\/]?))[0-9]{1,7}([ \-\/]?[0-9]{1,5})?)$/.test( value );
  }, '');
  jQuery.validator.addMethod("mailGR", function(value, element) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // allow any non-whitespace characters as the host part
    var valid = value.match(mailformat)

    return valid
  }, '');

    // Initialize form validation on the registration form.
    $("form[name='send-form']").validate({
      
      // Specify validation error messages
      messages: {
		    gender :"Bitte treffen Sie eine Auswahl.",
        firstname: " ",
        lastname: " ",
        phone : " ",
        email : " ",

        
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        $('#form-submit-button').prop('disabled',true)
        form.submit();
      }
    });

  var fn = $('#first-name').val().length
  
  var ln = $('#last-name').val().length

  var en = $('#email').val().length

  var pn = $('#phone').val().length

  fn = fn == 0? Infinity: 2;
  
  ln = ln == 0? Infinity: 2;

  en = en == 0? Infinity: 1;

  pn = pn == 0? Infinity: 1;

  var stat = false

  if(fn == 2 && ln == 2 && en == 1 && pn == 1){
    stat = true
  }
  else{
    stat = false
  }

  var settings = $("form[name='send-form']").validate().settings;
  // Modify validation settings
  $.extend(true, settings, {
    rules: {

      gender:{
        required: stat
      },

      firstname: {
        required: true,
        number:false,
        minlength: fn,
      },
      lastname: {
        required: true,
        number:false,
        minlength: ln,
      }, 
      email:{
        required: true,
        mailGR: true,
        email: true,
        minlength: en
      },
      phone: {    
        required: true,
        phoneGR: true,
        minlength: pn,
      },
    }
  });
  $("form[name='send-form']").validate().resetForm();
   removePopUp()
}
function removePopUp() {
  setTimeout(function(){ 
    $('#gender-error').remove();
   }, 2000);
}

window.onbeforeunload = function (e) {
  stat = localStorage.getItem('stat')
  if(eval(stat)){

    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
        e.returnValue = 'Sure?';
    }

    // For Safari
    return 'Sure?';
  }
};