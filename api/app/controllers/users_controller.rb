class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :find_user, except: [:create, :index]

  def index
    @users = User.all
    render json: @users.as_json(except: [:password_digest, :created_at, :updated_at]), status: :ok
  end

  def show
    render json: @user.as_json(except: [:password_digest, :created_at, :updated_at]), status: :ok
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user.as_json(except: [:password_digest, :created_at, :updated_at]),
        status: :created
    else
      render json: { errors: @user.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    unless @user.update(user_params)
      render json: { errors: @user.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def find_user
    @user = User.find_by_id!(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["User not found"] }, status: :not_found
  end

  def user_params
    params.permit(:username, :password, :name, :email, :bio)
  end
end
