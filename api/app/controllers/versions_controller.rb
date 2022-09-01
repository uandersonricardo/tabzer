class VersionsController < ApplicationController
  before_action :authorize_request
  before_action :find_version, except: [:create, :index]

  def index
    @versions = Version.all
    render json: @versions.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def show
    render json: @version.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def create
    params[:user_id] = @current_user.id

    @version = Version.new(version_params)

    if @version.save
      render json: @version.as_json(except: [:created_at, :updated_at]), status: :created
    else
      render json: { errors: @version.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    unless @version.update(version_params)
      render json: { errors: @version.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def destroy
    @version.destroy
  end

  private

  def find_version
    @version = Version.find_by_id!(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Version not found"] }, status: :not_found
  end

  def version_params
    params.permit(:name, :song_id, :instrument, :tuning, :difficulty, :tabs, :user_id)
  end
end
