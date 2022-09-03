class SearchController < ApplicationController
  def songs
    @songs = Song
      .search(search_params[:q])
      .page(search_params[:page])
      .per(search_params[:per_page])

    render json: @songs.as_json(
      except: [:created_at, :updated_at],
      include: [artist: { except: [:created_at, :updated_at] }]
    ), status: :ok
  end

  private

  def search_params
    params.permit(:q, :page, :per_page).with_defaults(page: 1, per_page: 3)
  end
end
