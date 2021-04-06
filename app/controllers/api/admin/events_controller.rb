class Api::Admin::EventsController < Api::Admin::AdminController
  def index
    events = Event.order(created_at: :desc)
    if params[:search].present?
      events = events.search(params[:search])
    end
    render json: events, meta: { total: events.count }, adapter: :json
  end

  def show
    render json: Event.find(params[:id])
  end

  def update
    event = Event.find(params[:id])

    event.assign_attributes(event_params)
    if event.save
      render json: event
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def destroy
    Event.find(params[:id]).destroy
  end

  private

  def event_params
    params.permit(
      :title, :description, :event_type, :image, :cost,
      :remote_url, :start_date, :location, :phone_number,
      :active
    )
  end
end
