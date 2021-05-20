class AddReferenceEventsToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :company
  end
end
