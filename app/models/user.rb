class User < ApplicationRecord
  has_many :events

  validates :password, presence: true, length: { in: 8..20 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'invalid email' }
end
