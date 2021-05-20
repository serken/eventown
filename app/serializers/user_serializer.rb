# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :id, :email, :first_name, :last_name, :is_admin, :has_company

  attribute :favorite_events do
    object.favorite_events
  end

  attribute :has_company do
    object.company.present?
  end

  has_many :comments
  has_many :events
  has_one :company
end
