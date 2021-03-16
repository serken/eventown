# frozen_string_literal: true

class AddUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""
      t.string :password, null: false, default: ''
      t.string :first_name, null: false, default: ''
      t.string :last_name, null: false, default: ''
      t.boolean :is_org, default: false
      t.string :org_name, default: '', null: false
      t.boolean :is_admin, null: false, default: false

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
