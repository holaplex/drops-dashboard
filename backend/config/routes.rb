require 'sidekiq/web'
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount Sidekiq::Web => '/sidekiq'

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
      resources :drops, only: %i[index show update]

      get '/nfts/:id/zip', to: 'nft#zip'

      post '/upload/excel', to: 'nft#upload_excel'
      post '/upload/minted', to: 'nft#upload_minted'
      get '/nfts', to: 'nft#index'
      post '/forgot_password', to: 'users#forgot_password'
      post '/reset_password', to: 'users#reset_password'
      post '/drops/submit/:drop_id', to: 'drops#submit'
      post '/drops/publish/:drop_id', to: 'drops#publish'
    end
  end
end
