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

  factory :artist do
    name { "The Beatles" }
    created_at { Time.now }
    updated_at { Time.now }
  end

  factory :song do
    name { "Yesterday" }
    genre { "Rock" }
    artist
    created_at { Time.now }
    updated_at { Time.now }
  end

  factory :version do
    name { "Principal" }
    song
    user
    instrument { "guitar" }
    tuning { "standard" }
    difficulty { "beginner" }
    tabs { "[{}]" }
    created_at { Time.now }
    updated_at { Time.now }
  end
end
