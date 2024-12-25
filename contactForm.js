function bookSession(ev, e) 
{
    ev.preventDefault();
    enableDisableDiv('#contactForm', false);
    if (!$('#contactForm').valid()) {
        toastr.error('Please check for form errors.');
        enableDisableDiv('#contactForm', true);
        return;
    }
    const Formdata = new FormData(document.getElementById("contactForm"));

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbznSt5R1o-IvfaoA46WYC79S5412LIFQ8JHJf5-XyOHuxiy0AR-6rCU8_rKWA3hvGFJ7w/exec',
        datatype: 'json',
        type: 'POST',
        data: Formdata,
        processData: false,
        contentType: false,

        success: function(response) {
            enableDisableDiv('#contactForm', true);
            var receivedData = response;
            if (receivedData.result == 'success') 
            {
                toastr.success('Request sent successfully.');
                clearContactForm();
            } 
            else 
            {
                toastr.error('Please try again later.');
            }
        },
        error: function() 
        {
            enableDisableDiv('#contactForm', true);
            toastr.error("Refresh the page and try again")
        }
    });
}

function clearContactForm()
{
    $('#contactForm').find('[name="name"]').val('');
    $('#contactForm').find('[name="phone"]').val('');
    $('#contactForm').find('[name="email"]').val('');
    $('#contactForm').find('[name="study_destination"]').val('');
    $('#contactForm').find('[name="message"]').val('');
}

// form validation
$('#contactForm').validate({
    rules: {
        name:{
            required: true
        },
        phone:{
            required: true,
            pattern: /^[6-9]\d{9}$/,
        },
        email:{
            required: true,
            email: true
        },
        study_destination:{
            required: true
        },
    },
    messages: {
        name:{
            required: "Please enter your full name"
        },
        phone:{
            required: "Please enter a phone number",
            pattern: "Invalid Phone Number"
        },
        email:{
            required: "Please enter your email"
        },
        study_destination:{
            required: "Please select your preferred study destination"
        },
    },
    errorElement: 'span',
    errorPlacement: function(error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error);
    },
    highlight: function(element, errorClass, validClass) {
        $(element).addClass('is-invalid');
    },
    unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass('is-invalid');
        $(element).addClass('is-valid');
    }
});