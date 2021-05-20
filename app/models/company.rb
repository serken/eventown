class Company < ApplicationRecord
  belongs_to :user

  has_many :comments, as: :commentable
  has_many :events
  scope :active, -> { where(active: true) }

  mount_uploader :image, ImageUploader
end
