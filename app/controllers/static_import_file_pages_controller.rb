class StaticImportFilePagesController < ApplicationController
  def home
  end

  def import
	  uploader = ImportFileUploader.new
	  file = params[:upload][:importfile].tempfile
	  uploader.store_filename = params[:upload][:importfile].original_filename
	  #binding.pry
	  uploader.store!(file)  		
    render :action => "home"
  end

  def direct  	  	  
  end

 # create the document in rails, then send json back to our javascript to populate the form that will be
  # going to amazon.
  def directimport 
    binding.pry
    @document = Document.create(params[:doc])
    render :json => {
      :policy => s3_upload_policy_document, 
      :signature => s3_upload_signature, 
      :key => @document.s3_key, 
      :success_action_redirect => '/direct'#document_upload_success_document_url(@document)
    }    
  end

  def multi
  end

  def multiimport
    uploader = ImportFileUploader.new
    file = params[:upload][:file].tempfile
    #binding.pry
    uploader.store_filename = params[:upload][:file].original_filename
    uploader.store!(file)     
    respond_to do |format|
      format.html {  
        render :json => [to_jq_upload(uploader.store_filename, file)].to_json, 
        :content_type => 'text/html',
        :layout => false
      }
      format.json {  
        render :json => [to_jq_upload(uploader.store_filename, file)].to_json     
      }
    end
  end
end

######################
# Helper Methods     #
######################

#one convenient method to pass jq_upload the necessary information
def to_jq_upload(store_filename, file)
  {
    "name" => store_filename,
    "size" => file.size,
    "url" => file.path,
    "thumbnail_url" => "../assets/excel-thumbnail.jpg"
  }
end

# just in case you need to do anything after the document gets uploaded to amazon.
  # but since we are sending our docs via a hidden iframe, we don't need to show the user a 
  # thank-you page.
  def s3_confirm
    head :ok
  end
 
  private
  
  # generate the policy document that amazon is expecting.
  def s3_upload_policy_document
    return @policy if @policy
    ret = {"expiration" => 5.minutes.from_now.utc.xmlschema,
      "conditions" =>  [ 
        {"bucket" =>  'rplus.imports'}, 
        ["starts-with", "$key", @document.s3_key],
        {"acl" => "private"},
        {"success_action_redirect" => "/direct"},
        ["content-length-range", 0, 1048576]
      ]
    }
    @policy = Base64.encode64(ret.to_json).gsub(/\n/,'')
  end

  # sign our request by Base64 encoding the policy document.
  def s3_upload_signature
    signature = Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest::Digest.new('sha1'), 'efmedJUEF1R7UUr8evO36IpG5dWcyhyWVsWLvnQ4', s3_upload_policy_document)).gsub("\n","")
  end