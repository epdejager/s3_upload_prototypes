  $(function() {
  console.log('In directUpload()')
  $('#fileupload').fileupload({
    forceIframeTransport: true,    // VERY IMPORTANT.  you will get 405 Method Not Allowed if you don't add this.
    autoUpload: true,
    add: function (event, data) {
      console.info('In the add function');
      $.ajax({
        url: "/directimport",
        type: 'POST',
        dataType: 'json',
        data: {doc: {title: data.files[0].name}},
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

      data.submit();
    },
    send: function(e, data) {      
      // show a loading spinner because now the form will be submitted to amazon, 
      // and the file will be directly uploaded there, via an iframe in the background. 
      console.log('sending');
      $('#loading').show();
    },
    fail: function(e, data) {
      console.log('fail');
      console.log(data);
    },
    done: function (event, data) {
      // here you can perform an ajax call to get your documents to display on the screen.
      //$('#your_documents').load("/documents?for_item=1234");
      
      // hide the loading spinner that we turned on earlier.
      console.log('done');
      $('#loading').hide();
    },
  });
});