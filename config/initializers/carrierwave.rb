CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider               => 'AWS',       # required
    :aws_access_key_id      => 'AKIAIO7DWLW3MRHV5QXQ',       # required
    :aws_secret_access_key  => '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',       # required
    :region                 => 'us-east-1'  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = 'rplus.imports'  # 'name_of_directory'                     # required
  config.fog_host       = 'https://s3.amazonaws.com' # 'https://assets.example.com'            # optional, defaults to nil
  config.fog_public     = false                                   # optional, defaults to true
  config.fog_attributes = {'Cache-Control'=>'max-age=315576000'}  # optional, defaults to {}
  #config.remove_previously_stored_files_after_update = false
end