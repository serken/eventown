class Api::UsersController < Api::ApiController

  def index
  end

  def show
  end

  def update
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
    current_user.destroy
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :login, :first_name, :last_name, :is_org, :org_name)
  end
end
