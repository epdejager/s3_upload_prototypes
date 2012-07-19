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

  def savedirect 
    @uploader = ImportFileDirectUploader.new
    binding.pry   
    render :action => "direct"
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

#one convenient method to pass jq_upload the necessary information
def to_jq_upload(store_filename, file)
  {
    "name" => store_filename,
    "size" => file.size,
    "url" => file.path,
    "thumbnail_url" => "../assets/excel-thumbnail.jpg"
  }
end