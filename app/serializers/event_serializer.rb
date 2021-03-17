# frozen_string_literal: true

class EventSerializer < ApplicationSerializer
  attributes :id, :title, :description, :start_date,
             :image, :cost, :remote_url, :location,
             :phone_number
  attribute :type do
    Event::TYPES_MAPPING[object.event_type]
  end
end
