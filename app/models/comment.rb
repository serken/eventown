class Comment < ActiveRecord::Base
  COMMENT_TYPES = {
    'event': Event,
    'user': User
  }

  belongs_to :commentable, polymorphic: true
  belongs_to :user, inverse_of: :comments
end
