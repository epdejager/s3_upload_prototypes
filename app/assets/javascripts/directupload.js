  var allFiles = new Array();
  $(function() {
  console.log('In directUpload()')
  $('#fileupload').fileupload({
    forceIframeTransport: true,    // VERY IMPORTANT.  you will get 405 Method Not Allowed if you don't add this.
    autoUpload: false,    
  add: function (e, data) {

      var that = $(this).data('fileupload');
      that._adjustMaxNumberOfFiles(-data.files.length);
      data.isAdjusted = true;
      data.isValidated = that._validate(data.files);
      data.context = that._renderUpload(data.files)

      .appendTo($(this).find('.files')).fadeIn(function () {
      // Fix for IE7 and lower:
        $(this).show();
      }).data('data', data);

      allFiles[allFiles.length] = data.files[0];

      for (i = 0; i < allFiles.length; i++)
        console.log(i + ": " + allFiles[i].name);

      /*
        //add policy etc
      console.info('In the add function, about to use ajax to add signature and policy information');
      for (i = 0; i < data.files.length; i++)
      {
      $.ajax({
        url: "/directimport",
        type: 'POST',
        dataType: 'json',
        data: {doc: {title: data.files[i].name}},
        async: false,
        success: function(retdata) {
          // after we created our document in rails, it is going to send back JSON of they key,
          // policy, and signature.  We will put these into our form before it gets submitted to amazon.
          console.info('In the success callback, about to add values to the key, policy and signature form keys');
          $('#fileupload').find('input[name=key]').val(retdata.key);
          $('#fileupload').find('input[name=policy]').val(retdata.policy);
          $('#fileupload').find('input[name=signature]').val(retdata.signature);          
        }        
        });

        if ((that.options.autoUpload || data.autoUpload) &&
            data.isValidated) {
            data.jqXHR = data.submit();                
        }  
      } //end loop
      */
    },
    send: function(e, data) {      

      // show a loading spinner because now the form will be submitted to amazon, 
      // and the file will be directly uploaded there, via an iframe in the background.       
      if (!data.isValidated) {
          var that = $(this).data('fileupload');
          if (!data.isAdjusted) {
            that._adjustMaxNumberOfFiles(-data.files.length);
          }
          if (!that._validate(data.files)) {
            return false;
          }
        }
        if (data.context && data.dataType &&
          data.dataType.substr(0, 6) === 'iframe') {
        // Iframe Transport does not support progress events.
        // In lack of an indeterminate progress bar, we set
        // the progress to 100%, showing the full animated bar:
          data.context.find('.ui-progressbar').progressbar(
          'value',
          parseInt(100, 10)
        );
      }
      console.log('sending');
      $('#loading').show();
    },
    fail: function(e, data) {
      console.log('fail');
      console.log(data);
      $('#loading').hide();
    },
    done: function (event, data) {
      // here you can perform an ajax call to get your documents to display on the screen.
      //$('#your_documents').load("/documents?for_item=1234");
      
      // hide the loading spinner that we turned on earlier.
      console.log('done');
      $('#loading').hide();
    },
    submit: function (event, data) {
      console.log('submitting');
    }
  });
});