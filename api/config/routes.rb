Rails.application.routes.draw do
  resources :users, param: :id
  resources :artists, param: :id
  resources :songs, param: :id
  resources :versions, param: :id

  get "search/songs"

  get "/user", to: "auth#me"
  post "/signin", to: "auth#login"

  get "/*a", to: "application#not_found"
end
