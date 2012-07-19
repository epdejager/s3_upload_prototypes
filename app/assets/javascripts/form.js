$(function () {

    $('.fileupload-content').append('<div id="loading"></div>');

    var inputs = $('#new_file :input[type=text]');
    
    clearFields(inputs);
    
    function clearFields (inputs) {
      $('.ui-state-error-text').remove();
      $.each(inputs, function(index, field){
        $(field).focus(function(){
          $(field).removeClass("ui-state-error");
          $(field).next().remove();
        });
      });
    };
  
    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload({
      maxNumberOfFiles: 10,
      acceptFileTypes: /\.(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG|txt)$/
    });
    
    console.info('hello')
    console.info($('#fileupload form').prop('action'))

    //$.ajax({url: $('#fileupload form').prop('action'), dataType: 'json', error: function (object, error, e) {
    //  console.info(e);
    //}});
    
    //$.ajax({fileupload: $('#url form').prop('action'), dataType: 'json', success: function (files) {
      /*
    // Load existing files:
    $.getJSON($('#fileupload form').prop('action'), function (files) {
        console.info('in')
        var fu = $('#fileupload').data('fileupload');
        //fu._adjustMaxNumberOfFiles(-files.length);
        fu._renderDownload(files)
            .appendTo($('#fileupload .files'))
            .fadeIn(function () {
                // Fix for IE7 and lower:
                $(this).show();
            });
            
            $(".best_in_place").best_in_place();
            Shadowbox.init();
            $('#loading').hide();
    }); 
    */ 

    $('#loading').hide();
    console.info('bye')     

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>')
            .prop('src', this.href)
            .appendTo('body');
    });
    
    
    $('#fileupload').bind('fileuploadsend', function (e, data) {
      
      var values = {};
      
      $.each($('#new_file').serializeArray(), function(i, field) {
          values[field.name] = field.value;
      });
 
      $.each( values, function(k, v){
        if (v == 0) {
          $('input[name="' + k + '"]').addClass("ui-state-error");
          $('input[name="' + k + '"]').after("<span class=\"ui-state-error-text\"> can't be blank!</span>");
        }
       });

    });
    
    $('#fileupload').bind('fileuploadprogressall', function (e,data) {
      var progress = parseInt(data.loaded / data.total * 100, 10);
      //$('.progress-bar').find('div').css('width',  progress + '%').find('span').html(progress + '%');
      console.info(progress);
    });

});