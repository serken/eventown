class Api::Admin::UsersController < Api::Admin::AdminController
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
    user = User.find(params[:id])
    user.assign_attributes(user_params)

    if user.save
      render json: user
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def destroy
    User.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :login, :first_name, :last_name, :is_admin)
  end
end
