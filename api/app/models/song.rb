class Song < ApplicationRecord
  validates :name, :artist, :genre, presence: true

  belongs_to :artist

  has_many :versions

  default_scope { order(created_at: :asc) }

  def self.search(q)
    Song.where("name ILIKE ?", "%#{q}%")
  end
end
