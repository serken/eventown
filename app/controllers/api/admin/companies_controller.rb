class Api::Admin::CompaniesController < Api::Admin::AdminController
  def index
    companies = Company.order(created_at: :desc)
    if params[:search].present?
      companies = companies.search(params[:search])
    end
    render json: companies, meta: { total: companies.count }, adapter: :json
  end

  def show
    render json: Company.find(params[:id])
  end

  def update
    company = Company.find(params[:id])

    company.assign_attributes(company_params)
    if company.save
      render json: company
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def create
    company = Company.new(company_params)
    if company.save
      render json: company
    else
      render json: { error: 'error' }, status: 422
    end
  end

  def destroy
    Company.find(params[:id]).destroy
  end

  private

  def company_params
    params.permit(
      :name, :description, :address, :image, :phone,
      :remote_url, :twitter, :facebook, :instagram,
      :active
    )
  end
end
