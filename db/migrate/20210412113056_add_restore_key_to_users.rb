class AddRestoreKeyToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users,:restore_token, :string
  end
end
