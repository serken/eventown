class Api::ApiController < ApplicationController
  after_action :add_csrf_to_response

  def add_csrf_to_response
    response.header['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end
end
