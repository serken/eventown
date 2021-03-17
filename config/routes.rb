Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    post 'sign_in', to: 'session#sign_in'
    post 'sign_up', to: 'users#create'
    delete 'sign_out', to: 'session#sign_out'
    resources :events
  end

  root to: 'landing#index'
  get '*path', to: 'landing#index'
end
