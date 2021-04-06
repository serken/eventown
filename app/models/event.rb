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

  scope :active, -> { where(active: true) }

  mount_uploader :image, ImageUploader
end
