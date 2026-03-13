import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieResponse {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
}

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      language: 'uk-UA',
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: 'application/json',
    },
  });

  return response.data.results;
};