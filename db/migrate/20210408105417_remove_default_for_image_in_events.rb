class RemoveDefaultForImageInEvents < ActiveRecord::Migration[5.2]
  def change
    change_column_default :events, :image, :null
    change_column_null    :events, :image, true
  end
end
