class CreateFavorites < ActiveRecord::Migration[5.2]
  def change
    create_table :favorites do |t|
      t.integer :favoritable_id
      t.string  :favoritable_type
      t.integer :user_id
    end

    add_index :favorites, :favoritable_id
    add_index :favorites, :favoritable_type
  end
end
