class UpdateDatesForEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :start_date
    add_column :events, :start_date, :date
    add_column :events, :start_time, :time
    add_column :events, :duration, :string
  end
end
