function sendtos3() {
      var len = $('#filestable tr').length; 
      for (i = 0; i < len; i++)
      {
      $.ajax({
        url: "/directimport",
        type: 'POST',
        dataType: 'json',
        data: {doc: {title: $('#filestable tr:eq(' + i + ')').find('td').eq(1).html()}},
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

        $('#uploadform').submit();                

      }
    }
