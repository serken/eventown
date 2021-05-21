require 'sidekiq/web'
require 'sidekiq_unique_jobs/web'
require 'sidekiq/cron/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq'

  namespace :api, defaults: {format: 'json'} do
    post 'sign_in', to: 'session#sign_in'
    post 'sign_up', to: 'users#create'
    delete 'sign_out', to: 'session#sign_out'
    get 'restore_session', to: 'session#restore'
    post 'restore_password', to: 'session#restore_password'
    post 'update_password', to: 'session#update_password'
    get 'near_events', to: 'events#near_events'

    resources :events do
      member do
        post 'favorite'
        post '/comments', to: 'events#add_comment'
        delete '/comments/:comment_id', to: 'events#delete_comment'
      end
    end
    resources :users do
      member do
        post '/comments', to: 'users#add_comment'
        delete '/comments/:comment_id', to: 'users#delete_comment'
      end
    end

    resources :companies do
      member do
        post '/comments', to: 'companies#add_comment'
        delete '/comments/:comment_id', to: 'companies#delete_comment'
      end
    end

    namespace :admin do
      resources :events
      resources :users
      resources :companies
    end
  end

  root to: 'landing#index'
  get '*path', to: 'landing#index'
end
