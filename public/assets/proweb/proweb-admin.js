
$(document).ready(function() {

    $('.editor').trumbowyg({
        plugins: {
            allowTagsFromPaste: {
                allowedTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'b', 'strong', 'i', 'ul', 'ol', 'li', 'a']
            }
        }
    });

    $(".pasirink-diena").datepicker({
        todayHighlight: true,
        autoclose: true,
        format: 'yyyy-mm-dd',
    });


});


