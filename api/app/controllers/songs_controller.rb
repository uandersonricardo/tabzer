class SongsController < ApplicationController
  before_action :authorize_request
  before_action :find_song, except: [:create, :index]

  def index
    @songs = Song.all
    render json: @songs.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def show
    render json: @song.as_json(except: [:created_at, :updated_at]), status: :ok
  end

  def create
    @song = Song.new(song_params)

    if @song.save
      render json: @song.as_json(except: [:created_at, :updated_at]), status: :created
    else
      render json: { errors: @song.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    unless @song.update(song_params)
      render json: { errors: @song.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def destroy
    @song.destroy
  end

  private

  def find_song
    @song = Song.find_by_id!(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { errors: ["Song not found"] }, status: :not_found
  end

  def song_params
    params.permit(:name, :artist_id, :genre)
  end
end
