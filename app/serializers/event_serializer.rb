# frozen_string_literal: true

class EventSerializer < ApplicationSerializer
  attributes :id, :title, :description, :start_date,
             :pic, :cost, :remote_url, :location,
             :phone_number, :user_id, :created_at, :updated_at,
             :active, :duration
  attribute :type do
    Event::TYPES_MAPPING[object.event_type]
  end

  attribute :pic do
    object.image_url
  end

  attribute :start_time do
    object.start_time&.strftime('%H:%M')
  end

  has_many :comments
end
