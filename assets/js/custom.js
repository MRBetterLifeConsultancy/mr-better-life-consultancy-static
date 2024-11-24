/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * 
 *   $(function () {
 $("#example1").DataTable({
 "responsive": true, "lengthChange": false, "autoWidth": false,
 "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
 }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
 
 $('#example2').DataTable({
 "paging": true,
 "lengthChange": false,
 "searching": false,
 "ordering": true,
 "info": true,
 "autoWidth": false,
 "responsive": true,
 });
 });
 */
var g_Table = $("#datatable").DataTable({
    "stateSave": true,
    "responsive": false,
    "lengthChange": false,
    "autoWidth": false,
    //"buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
});
//g_Table.buttons().container().appendTo('#datatable_wrapper .col-md-6:eq(0)');

function customizedDate(date_string = "")
{
    if (date_string != "" && date_string != null)
    {
        var d = new Date(date_string);
        var options = {
            hour12: true,
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        }
        return d.toLocaleString("en-US", options);
    }
    else
    {
        return "";
}
}

function enableDisableDiv(selector, enable)
{
    var processingElement = '<div class="myoverlay" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0,0,0,0.2);align-items: center;display: flex;justify-content: center;color: white;font-size: xx-large;">'
            + '<div class="processing" style="/*! display: flex; *//*! justify-content: center; */justify-self: right;vertical-align: baseline;">'
            + 'Processing'
            + '</div>'
            + '</div>'
    var element = $(selector);
    if (enable)
    {
        element.prop('disabled', false);
        element.css('pointer-events', "all");
        element.css('opacity', 1);
        element.find('.myoverlay').remove();
    }
    else
    {
        element.prop('disabled', true);
        element.css('pointer-events', "none");
        element.css('opacity', 0.4);
        element.append($(processingElement));
    }
}
function loadProcessing(e)
{
    $('[name="loading_modal"]').modal('show');
}

function formatDate(dateString, format)
{
    var d = new Date(dateString);
    if (typeof format == "undefined")
    {
        format = "dddd, mmmm dS, yyyy, h:MM:ss TT";
    }
    return dateFormat(d, format);
}

$(document).ready(function ()
{

    /*if ($('.custom-select2').hasClass("select2-hidden-accessible")) {
     // Select2 has been initialized
     $('.custom-select2').select2({
     theme: 'bootstrap4'
     });
     
     }*/
    if (typeof $('.custom-select2') !== 'undefined')
    {
        $('.custom-select2').select2({
            theme: 'bootstrap4'
        });
    }
    if (typeof $('.default-select2') !== 'undefined')
    {
        $('.default-select2').select2({
            theme: 'default'
        });
    }

    // if (displayFlash)
    // {
    //     displayAlert(flashdata_type, flashdata_msg);

    // }
});

$(document).on('select2:open', (e) => {
    const selectElement = $(e.target);
    if (!selectElement.attr('multiple'))
    {
        document.querySelector('.select2-container--open .select2-search__field').focus();
    }
    /*setTimeout(() => {
     // Find the search field in the opened dropdown
     document.querySelector('.select2-container--open .select2-search__field').focus();
     }, 0); // Delay to ensure Select2's UI has rendered})*/
});

toastr.options = {
    "closeButton": true,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function displayAlert(type, message)
{
    if (type == "success")
    {
        toastr.success(message);
    }
    else if (type == "error")
    {
        toastr.error(message);
    }
    else if (type == "warning")
    {
        toastr.warning(message);
    }
    else
    {
        toastr.info(message);
    }
}

function displayFormAlert(formDOM, $message)
{
    var templateString = "<div class='alert alert-danger alert-icon alert-dismissible fade show' name='form_alert' role='alert'>" +
            "<i class='uil uil-times-circle'></i>" +
            "<span>" + $message + "</span>" +
            "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>" +
            "</div>";
    $(formDOM).prepend(templateString);
}

function removeFormAlert(formDOM)
{
    $(formDOM).find('[name="form_alert"]').remove();
}


function displayYesNoText(value)
{
    var text = "";
    if (value == 1)
    {
        text = "Yes";
    }
    else if (value == 0)
    {
        text = "No";
    }
    return text;
}

function convertToIndianCurrencyWords(price)
{
    var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
            dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
            tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
            handle_tens = function (dgt, prevDgt)
            {
                return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
            },
            handle_utlc = function (dgt, nxtDgt, denom)
            {
                return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
            };

    var str = "",
            digitIdx = 0,
            digit = 0,
            nxtDigit = 0,
            words = [];
    if (price += "", isNaN(parseInt(price)))
        str = "";
    else if (parseInt(price) > 0 && price.length <= 10)
    {
        for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
            switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1)
            {
                case 0:
                    words.push(handle_utlc(digit, nxtDigit, ""));
                    break;
                case 1:
                    words.push(handle_tens(digit, price[digitIdx + 1]));
                    break;
                case 2:
                    words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
                    break;
                case 3:
                    words.push(handle_utlc(digit, nxtDigit, "Thousand"));
                    break;
                case 4:
                    words.push(handle_tens(digit, price[digitIdx + 1]));
                    break;
                case 5:
                    words.push(handle_utlc(digit, nxtDigit, "Lakh"));
                    break;
                case 6:
                    words.push(handle_tens(digit, price[digitIdx + 1]));
                    break;
                case 7:
                    words.push(handle_utlc(digit, nxtDigit, "Crore"));
                    break;
                case 8:
                    words.push(handle_tens(digit, price[digitIdx + 1]));
                    break;
                case 9:
                    words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
            }
        str = words.reverse().join("")
    }
    else
        str = "";
    return str
}

function calculateFinalAmount(total_amount, discount_percentage, tax_percentage, shipping_cost)
{
    console.log(total_amount, discount_percentage, tax_percentage, shipping_cost);
    discount_amount = parseInt(total_amount * discount_percentage / 100)
    amount_after_discount = (total_amount - discount_amount)

    amount_without_tax = (shipping_cost + amount_after_discount)

    tax_amount = parseInt(amount_without_tax * tax_percentage / 100)
    final_amount = (amount_without_tax + tax_amount)

    return {
        "discount_amount": discount_amount,
        "amount_after_discount": amount_after_discount,
        "amount_without_tax": amount_without_tax,
        "tax_amount": tax_amount,
        "final_amount": final_amount
    }
}

function getMaskedPhoneNumber(num)
{
    masked_num = num.replace(num.substring(0, 7), 'XXX-XXX-X');
    return masked_num;
}

function get_date_difference_string(start_date, end_date = null)
{
    start_date = new Date(start_date);
    if (end_date == null)
    {
        end_date = new Date();
    }

    diff = end_date - start_date;

    years = Math.floor(diff / (365 * 60 * 60 * 24 * 1000));
    months = Math.floor((diff - years * 365 * 60 * 60 * 24 * 1000) / (30 * 60 * 60 * 24 * 1000));
    days = Math.floor((diff - years * 365 * 60 * 60 * 24 * 1000 - months * 30 * 60 * 60 * 24 * 1000) / (60 * 60 * 24 * 1000));

    diff_string = years + (years > 1 ? " years, " : " year, ") + months + (months > 1 ? " months, " : " month, ") + days + (days > 1 ? " days" : " day");
    return diff_string;
}

function array_column(array_name, column_name)
{
    return array_name.map(x => x[column_name]);
}

function resetSelectDropDownOptions(target_div, select_field_name, option1_text = "Select")
{
    $(target_div).find('[name="'+ select_field_name +'"]').empty().trigger("change");
    $(target_div).find('[name="'+ select_field_name +'"]').select2('data', {id: "", text: 'Select'});
}

function getRandomIntInclusive(min, max)
{
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function getRandomArithmeticQuestion()
{
    var a = getRandomIntInclusive(1, 10);
    var b = getRandomIntInclusive(1, 10);
    const operators_list = ['+', '-', '*'];

    var question_text = "";
    var answer = "";

    switch(operators_list[getRandomIntInclusive(1, operators_list.length)])
    {
        case '+':
            question_text = a + ' + ' + b + ' = ';
            answer = a + b;
            break;

        case '-':
            question_text = a + ' - ' + b + ' = ';
            answer = a - b;
            break;

        case '*':
            question_text = a + ' * ' + b + ' = ';
            answer = a * b;
            break;     
    }

    return {
        "question_text" : question_text,
        "answer" : answer
    }
}

function calculateHoursDifference(startTime, endTime, round_to = 2) 
{
    // Convert both times to Date objects
    const startDate = new Date(`2000-01-01T${startTime}`);
    const endDate = new Date(`2000-01-01T${endTime}`);
  
    // Calculate the difference in milliseconds
    const diffMilliseconds = endDate.getTime() - startDate.getTime();
  
    // Convert milliseconds to hours
    const diffHours = diffMilliseconds / (1000 * 60 * 60);
  
    return diffHours.toFixed(round_to);
  }
  