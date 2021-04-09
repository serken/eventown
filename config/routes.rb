Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    post 'sign_in', to: 'session#sign_in'
    post 'sign_up', to: 'users#create'
    delete 'sign_out', to: 'session#sign_out'
    get 'restore_session', to: 'session#restore'

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

    namespace :admin do
      resources :events
      resources :users
    end
  end

  root to: 'landing#index'
  get '*path', to: 'landing#index'
end
