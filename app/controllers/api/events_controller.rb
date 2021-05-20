class Api::EventsController < Api::ApiController

  def index
    events = current_user&.is_admin ? Event : Event.active
    if params[:date_filter].present?
      start_date = params[:date_filter][0]
      end_date = params[:date_filter][1] || start_date
      events = events.with_date_range(start_date, end_date)
    end

    if params[:favorite]
      events = events.where(id: params[:id])
    end
    events = events.paginate(page: params[:page], per_page: params[:per_page])
    if params[:filters].present?
      events = events.where(event_type: params[:filters])
    end
    render json: events, meta: { total: events.count }, adapter: :json
  end

  def show
    render json: Event.find(params[:id])
  end

  def update
    event = current_user.company.events.find(params[:id])
    event.assign_attributes(event_params)
    if event.save
      render json: event
    else
      render json: { errors: 'error' }, status: 422
    end
  end

  def favorite
    event = Event.find(params[:id])
    favoritable = current_user.favorites.find_by(favoritable: event)
    if favoritable.present?
      favoritable.destroy
    else
      current_user.favorites.create(favoritable: event)
    end

    render json: current_user
  end

  def create
    event = current_user.company.events.new(event_params)
    if event.save
      render json: event
    else
      render json: { errors: event.errors.messages, full_errors: event.errors.full_messages }, status: 422
    end
  end

  def destroy
    current_user.company.events.find(params[:id]).destroy
  end

  def add_comment
    event = Event.find(params[:id])
    current_user.my_comments.create(commentable: event, message: params[:message])

    render json: event
  end

  def delete_comment
    event = Event.find(params[:id])
    current_user.my_comments.find_by(commentable: event, id: params[:comment_id]).destroy

    render json: event
  end

  private

  def event_params
    params.permit(
      :title, :description, :event_type, :image, :cost,
      :remote_url, :start_date, :location, :phone_number,
      :duration, :start_time
    )
  end
end
