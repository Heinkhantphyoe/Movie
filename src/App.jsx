import React, { useEffect, useState } from 'react'
import {useDebounce} from 'react-use'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import Header from './components/Header'
import Pagination from './components/Pagination'
import Loading from './components/Loading'
import { ArrowLeft } from 'lucide-react'

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Ensure this is set in your .env file

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieLists, setMovieLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [debouncedSearchTerm,setDebouncedSearchTerm] = useState("");

  useDebounce( () => {
    setDebouncedSearchTerm(searchTerm);
  }, 500, [searchTerm]);

  const fetchMovies = async (page = 1, searchTerm = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const endpoint = searchTerm ?
        `${API_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${page}` :
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.Response === "False") {
        setErrorMessage(data.Error);
        setMovieLists([]);
        return;
      }

      setMovieLists(data.results || []);
      setCurrentPage(data.page || 1);
      setTotalPages(data.total_pages || 0);
      setTotalResults(data.total_results || 0);
    } catch (error) {
      console.error('Error Fetching movies:', error);
      setErrorMessage("Error fetching movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchMovies(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <Header />
      <Search search={searchTerm} setSearch={setSearchTerm} />

      <section className="w-full max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : errorMessage ? ( 
          <div className="text-red-500 text-center">
            {errorMessage}
            <div className='flex justify-center items-center mt-8'>
              <button
                onClick={() => { fetchMovies(), setSearchTerm("") }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
            </div>
          </div>

        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieLists.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        )
        }
      </section >
    </div >
  )
}

export default App