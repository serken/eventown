class Api::UsersController < Api::ApiController
  def index
    users = User.paginate(page: params[:page], per_page: params[:per_page])
    if params[:search].present?
      users = users.search(params[:search])
    end
    render json: users, meta: { total: users.count }, adapter: :json
  end

  def show
    render json: User.find(params[:id])
  end

  def update
    current_user.assign_attributes(user_params)

    if current_user.save
      render json: current_user
    else
      render json: { errors: 'error' }, status: 422
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: { errors: user.errors.messages, full_errors: user.errors.full_messages }, status: 422
    end
  end

  def destroy
    if current_user
      current_user.destroy
      session[:user_id] = nil
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :login, :first_name, :last_name, :is_org, :org_name)
  end
end
