class AddEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false, default: ""
      t.string :description
      t.integer :event_type, null: false, default: Event.event_types[:party]
      t.string :image
      t.float :cost
      t.string :remote_url
      t.datetime :start_date
      t.string :location
      t.string :phone_number

      t.timestamps null: false
    end
  end
end
