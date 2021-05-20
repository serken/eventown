class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :is_org
    remove_column :users, :org_name
    create_table :companies do |t|
      t.string :name
      t.string :description
      t.string :image
      t.string :phone
      t.string :address
      t.integer :user_id
      t.string :facebook
      t.string :twitter
      t.string :instagram
      t.boolean :active
      t.string :remote_url

      t.timestamps
    end
  end
end
