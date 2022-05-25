Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # API
  scope :api, defaults: { format: :json } do
    scope :v1 do
      use_doorkeeper do
        skip_controllers :authorizations,
                         :applications,
                         :authorized_applications
      end

      # This is how we override a devise controller.
      devise_for :users, controllers: { registrations: 'registrations' }

      namespace :users do
        get 'me', action: :me
      end

      resources :users, only: [:index]

      post '/upload/excel', to: 'nft#upload_excel'
      post '/upload/minted', to: 'nft#upload_minted'
      get '/nfts', to: 'nft#index'
      get '/drops', to: 'drop#index'
      post '/forgot_password', to: 'users#forgot_password'
      post '/reset_password', to: 'users#reset_password'
      get '/drops/:drop_id', to: 'drop#show'
    end
  end
end
