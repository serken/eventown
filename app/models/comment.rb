class Comment < ActiveRecord::Base
  COMMENT_TYPES = {
    'event': Event,
    'user': User
  }

  default_scope -> {order(created_at: :desc)}
  belongs_to :commentable, polymorphic: true
  belongs_to :user, inverse_of: :comments
end
