class Event < ApplicationRecord
  enum event_type: {
    party: 0,
    master_class: 1,
    performance: 2,
    opening: 3
  }

  TYPES_MAPPING = {
    'party' => 'Вечеринка',
    'master_class' => 'Мастер Класс',
    'performance' => 'Выставка',
    'opening' => 'Открытие'
  }

  belongs_to :user
  has_many :favorites, as: :favoritable
  has_many :comments, as: :commentable

  scope :active, -> { where(active: true) }

  scope :with_date_range, -> (start_date, end_date) { where(start_date: start_date..end_date) }

  mount_uploader :image, ImageUploader

  validates :cost, :duration, numericality: true
  validates :event_type, :title, :description, :phone_number, :start_time, :start_date, presence: true
  validates :title, length: { in: 8..20 }
end
