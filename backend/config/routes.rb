Rails.application.routes.draw do
  get '/foods/search', to: 'foods#searchbar'
  resources :foods
  resources :days
  resources :users, only: [:create, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
