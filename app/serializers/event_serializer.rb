# frozen_string_literal: true

class EventSerializer < ApplicationSerializer
  attributes :id, :title, :description, :start_date,
             :pic, :cost, :remote_url, :location,
             :phone_number, :user_id, :created_at, :updated_at
  attribute :type do
    Event::TYPES_MAPPING[object.event_type]
  end

  attribute :pic do
    object.image_url
  end
end
