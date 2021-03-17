class AddEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false, default: ""
      t.string :description, null: false, default: ""
      t.integer :event_type, null: false, default: Event.event_types[:party]
      t.string :image, null: false, default: ""
      t.float :cost, null: false, default: ''
      t.string :remote_url, null: false, default: ''
      t.datetime :start_date
      t.string :location, default: '', null: false
      t.string :phone_number, null: false, default: false

      t.timestamps null: false
    end
  end
end
