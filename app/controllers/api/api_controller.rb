class Api::ApiController < ApplicationController
  respond_to :json
  after_action :add_csrf_to_response
  #before_action :is_admin

  def add_csrf_to_response
    response.header['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end

  private

  def is_admin
    if !current_user&.is_admin
      render(json: {}, status: 403) and return
    end
  end
end
