class PasswordResetMailer < ApplicationMailer
  default :from => 'no-reply@eventown.com'

  def send_reset_password(user)
    @user = user
    mail( :to => @user.email,
    :subject => 'Запрос на сброс пароля' )
  end
end
