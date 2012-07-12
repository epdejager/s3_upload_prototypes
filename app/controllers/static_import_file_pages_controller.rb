class StaticImportFilePagesController < ApplicationController
  def home
  end

  def import
	uploader = ImportFileUploader.new
	file = params[:upload][:importfile].tempfile
	uploader.store_filename = params[:upload][:importfile].original_filename
	binding.pry
	uploader.store!(file)  		
  	render :action => "home"
  end
end
