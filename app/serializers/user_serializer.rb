# frozen_string_literal: true

class UserSerializer < ApplicationSerializer
  attributes :id, :email, :first_name, :last_name,
             :is_org, :org_name, :is_admin

  has_many :events
end
