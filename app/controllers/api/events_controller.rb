class Api::EventsController < Api::ApiController

  def index
    events = Event.paginate(page: params[:page], per_page: params[:per_page])
    if params[:filters].present?
      events = events.where(event_type: params[:filters])
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
    params.permit!
  end
end
