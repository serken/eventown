class User < ApplicationRecord
  has_many :events, inverse_of: :user
  has_many :favorites, inverse_of: :user

  validates :password, presence: true, length: { in: 8..20 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'invalid email' }

  def favorite_events
    self.favorites.where(favoritable_type: 'Event')
  end
end
