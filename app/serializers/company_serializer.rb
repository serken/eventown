# frozen_string_literal: true

class CompanySerializer < ApplicationSerializer
  attributes :id, :name, :description,
             :pic, :address, :remote_url, :facebook, :twitter, :instagram,
             :phone, :user_id, :created_at, :updated_at,
             :active

  attribute :pic do
    object.image_url
  end

  has_many :comments
  has_many :events
end
