FactoryBot.define do
  factory :user do
    username { "john" }
    name { "John Doe" }
    email { "john@doe.com" }
    password { "123456" }
    password_confirmation { password }
    bio { "I'm a guitar player" }
    created_at { Time.now }
    updated_at { Time.now }
  end
end
