Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  resources :users, param: :id
  post '/auth/login', to: 'auth#login'
  get '/*a', to: 'application#not_found'
end
