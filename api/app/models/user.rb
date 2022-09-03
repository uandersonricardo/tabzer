class User < ApplicationRecord
  has_secure_password

  validates :email, :username, :password_digest, :name, presence: true
  validates :email, :username, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
    length: { minimum: 6 },
    if: -> { new_record? || !password.nil? }

  has_many :versions

  default_scope { order(created_at: :asc) }
end
