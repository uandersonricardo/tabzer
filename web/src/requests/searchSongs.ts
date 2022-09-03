import api from "../services/api";

export interface SearchSongsRequestQuery {
  q?: string;
  page?: number;
  per_page?: number;
}

const searchSongs = async (query: SearchSongsRequestQuery) => {
  return await api.get("/search/songs", { params: query });
};

export default searchSongs;
