class Api::SessionController < Api::ApiController
  def sign_in
    user = User.where(user_params.slice(:email, :password)).first
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: 'Email or password is incorrect' }, status: 401
    end
  end

  def restore
    render json: current_user
  end

  def restore_password
    user = User.find_by(email: params[:email])
    RestorePasswordWorker.perform_async(user&.id)

    render json: 'Спасибо. Вам на почту было выслано письмо с ссылкой на восстановление пароля'
  end

  def update_password
    password = params[:password]
    token = params[:token]

    user = User.find_by(restore_token: token)

    if user && token.present?
      user.update_attributes(password: password, restore_token: nil)
      render json: user
    else
      render json: { errors: 'Обновить пароль неудалось. Попробуйте сбросить его еще раз' }
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
