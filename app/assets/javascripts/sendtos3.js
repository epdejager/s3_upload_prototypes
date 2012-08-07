function sendtos3() {
      console.log("In sendtos3()")
      var len = allFiles.length; 
      for (i = 0; i < len; i++)
      {
      $.ajax({
        url: "/multidirectimport",
        type: 'POST',
        dataType: 'json',
        //data: {doc: {title: $('#filestable tr:eq(' + i + ')').find('td').eq(1).html()}},
        data: {doc: {title: allFiles[i].name}},
        async: false,
        success: function(retdata) {
          // after we created our document in rails, it is going to send back JSON of they key,
          // policy, and signature.  We will put these into our form before it gets submitted to amazon.
          console.info('In the success callback, about to add values to the key, policy and signature form keys');
          $('#fileupload').find('input[name=key]').val(retdata.key);
          $('#fileupload').find('input[name=policy]').val(retdata.policy);
          $('#fileupload').find('input[name=signature]').val(retdata.signature);          
          //Apparrently this is not programatically possible!!!
          //See http://social.msdn.microsoft.com/forums/en-US/Vsexpressvb/thread/f3c0097c-d732-409d-87d4-59b3875b45b4/
          //So I cant see how multi-file uploads can work at this point
          $('#fileupload').find('input[name=file]').val(retdata.key);          
        }        
        });        

        $('#uploadform').submit();               
        //$('#uploadform').send(); 

      }
    
}