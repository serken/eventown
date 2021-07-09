class Api::CompaniesController < Api::ApiController

  def index
    companies = current_user&.is_admin ? Company : Company.active

    if params[:favorite]
      companies = companies.where(id: params[:id])
    end

    companies = companies.paginate(page: params[:page], per_page: params[:per_page])
    render json: companies, meta: { total: companies.count }, adapter: :json
  end

  def show
    render json: Company.find(params[:id])
  end

  def update
    company = current_user.company
    company.assign_attributes(company_params)
    if company.save
      company.reload
      render json: company
    else
      render json: { errors: 'error' }, status: 422
    end
  end

  def favorite
    company = Company.find(params[:id])
    favoritable = current_user.favorites.find_by(favoritable: company)
    if favoritable.present?
      favoritable.destroy
    else
      current_user.favorites.create(favoritable: company)
    end

    render json: current_user
  end

  def create
    company = Company.new(company_params.merge(user_id: current_user.id))

    if company.save
      render json: company
    else
      render json: { errors: company.errors.messages, full_errors: company.errors.full_messages }, status: 422
    end
  end

  def destroy
    current_user.company.destroy
  end

  def add_comment
    company = Company.find(params[:id])
    current_user.my_comments.create(commentable: company, message: params[:message])

    render json: company
  end

  def delete_comment
    company = Company.find(params[:id])
    current_user.my_comments.find_by(commentable: company, id: params[:comment_id]).destroy

    render json: company
  end

  private

  def company_params
    params.permit(
      :name, :description, :image, :address,
      :remote_url, :phone, :twitter, :facebook, :instagram,
    )
  end
end
