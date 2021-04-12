class User < ApplicationRecord
  has_many :events, inverse_of: :user
  has_many :favorites, inverse_of: :user
  has_many :my_comments, inverse_of: :user, class_name: 'Comment'
  has_many :comments, as: :commentable

  validates :password, presence: true, length: { in: 8..20 }
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'invalid email' }

  def favorite_events
    self.favorites.where(favoritable_type: 'Event')
  end

  def commented_events
    self.my_comments.where(commentable_type: 'Event')
  end

  def commented_users
    self.my_comments.where(commentable_type: 'User')
  end

  def create_restore_token
    self.update_attributes(restore_token: "#{self.id}#{Time.now.to_i}")
  end

  def reset_password_url
    ENV['ROOT_URL'] + "restore_password?token=#{self.restore_token}"
  end
end
