class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs, id: :uuid do |t|
      t.string :name, null: false
      t.references :artist, type: :uuid, null: false, foreign_key: true
      t.string :genre, null: false

      t.timestamps
    end
    add_index :songs, :name
    add_index :songs, :genre
  end
end
