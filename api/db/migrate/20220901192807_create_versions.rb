class CreateVersions < ActiveRecord::Migration[7.0]
  def change
    create_table :versions, id: :uuid do |t|
      t.string :name, null: false
      t.references :song, type: :uuid, null: false, foreign_key: true
      t.string :instrument, null: false
      t.string :tuning, null: false
      t.string :difficulty, null: false
      t.jsonb :tabs, null: false
      t.references :user, type: :uuid, null: false, foreign_key: true

      t.timestamps
    end
    add_index :versions, :name
    add_index :versions, :instrument
    add_index :versions, :tuning
    add_index :versions, :difficulty
  end
end
