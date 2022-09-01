class Version < ApplicationRecord
  validates :name, :song, :user, :instrument, :tuning, :difficulty, :tabs, presence: true

  belongs_to :song
  belongs_to :user

  default_scope { order(created_at: :asc) }
end
