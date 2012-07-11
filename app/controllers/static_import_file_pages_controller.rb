class StaticImportFilePagesController < ApplicationController
  def home
  end

  def import
	uploader = ImportFileUploader.new
	uploader.store!(filename)  	
  	render :action => "home"
  end
end
