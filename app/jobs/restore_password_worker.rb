class RestorePasswordWorker
  include Sidekiq::Worker

  def perform(user_id)
    return unless user_id

    user = User.find(user_id)
    logger.info("Send password reset email for user: #{user.id}")
    user.create_restore_token
    PasswordResetMailer.send_reset_password(user).deliver
  end
end
