# frozen_string_literal: true

class CommentSerializer < ApplicationSerializer
  attributes :message, :created_at, :user_id, :id, :commentable_id

  attribute :created_at do
    object.created_at&.strftime('%H:%M:%S %D')
  end

  attribute :user_name do
    object.user.email
  end
end
