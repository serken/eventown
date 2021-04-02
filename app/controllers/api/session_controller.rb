class Api::SessionController < Api::ApiController
  def sign_in
    user = User.where(user_params.slice(:email, :password)).first
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: { error: 'not authorized' }, status: 401
    end
  end

  def sign_out
    if current_user
      session[:user_id] = nil
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end
