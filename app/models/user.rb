class User < ApplicationRecord
  has_many :events

  validates :password, presence: true
end
