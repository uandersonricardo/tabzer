class ArtistsController < ApplicationController
  before_action :authorize_request
  before_action :find_artist, except: [:create, :index]

  def index
    @artists = Artist.all
    render json: @artists.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def show
    render json: @artist.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def create
    @artist = Artist.new(artist_params)

    if @artist.save
      render json: @artist.as_json(except: [:created_at, :updated_at]), status: :created
    else
      render json: { errors: @artist.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    unless @artist.update(artist_params)
      render json: { errors: @artist.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def destroy
    @artist.destroy
  end

  private

  def find_artist
    @artist = Artist.find_by_id!(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Artist not found"] }, status: :not_found
  end

  def artist_params
    params.permit(:name, :image_url)
  end
end
