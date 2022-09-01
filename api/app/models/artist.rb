class Artist < ApplicationRecord
  validates :name, presence: true

  has_many :songs

  default_scope { order(created_at: :asc) }
end
