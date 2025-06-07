import { Award, Calendar, Clock, DollarSign, Film, Globe, Play, Star, Users, X, Youtube } from 'lucide-react';
import { useState } from 'react';
import { FaYoutube } from "react-icons/fa";
import { TbVideoMinus } from "react-icons/tb";


const getRatingColor = (rating) => {
  if (rating >= 8) return "text-green-500";
  if (rating >= 6) return "text-yellow-500";
  return "text-red-500";
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const watchOnYouTube = (movieName) => {
  const searchQuery = encodeURIComponent(movieName);
  const SearchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  window.open(SearchUrl, '_blank');
};
const watchOnChannelMyanmar = (movieName) => {
  const searchQuery = encodeURIComponent(movieName);
  const SearchUrl = `https://www.channelmyanmar.to/?s=${searchQuery}`;
  window.open(SearchUrl, '_blank');
};




// Complete TMDB Genre Mapping (Official from TMDB API)
const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const MovieDetailsModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;
  console.log(movie);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700">
          <img
            src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => onClose()}
            className="z-10 absolute top-4 right-4 bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>



          {/* Rating badge */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-full px-3 py-2 flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-2" fill="currentColor" />
            <span className={`text-sm font-bold ${getRatingColor(movie.vote_average)}`}>
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>


        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and basic info */}
          <div className="flex items-start space-x-6 mb-6">
            {/* Poster */}
            <div className="flex-shrink-0 -mt-20 z-10">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="w-32 h-48 object-cover rounded-xl shadow-lg border-4 border-white"
              />
            </div>

            {/* Movie info */}
            <div className="flex-1 pt-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.title}</h1>
              {movie.original_title !== movie.title && (
                <p className="text-lg text-gray-600 mb-3 italic">"{movie.original_title}"</p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(movie.release_date)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{movie.runtime || 'N/A'} min</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{movie.vote_count.toLocaleString()} votes</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre_ids.map(genreId => (
                  <span
                    key={genreId}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {genreMap[genreId] || `Genre ${genreId}`}
                  </span>
                ))}
              </div>

              {/* Additional stats */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Popularity: {movie.popularity.toFixed(0)}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                  <span>Budget: {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {movie.overview || "No overview available for this movie."}
            </p>
          </div>

          {/* Production Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Production Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Release Date:</strong> {formatDate(movie.release_date)}</div>
                <div><strong>Original Language:</strong> {movie.original_language.toUpperCase()}</div>
                <div><strong>Status:</strong> {movie.status || 'Released'}</div>
                <div><strong>Movie ID:</strong> {movie.id}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Box Office</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Budget:</strong> {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</div>
                <div><strong>Revenue:</strong> {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</div>
                <div><strong>Profit:</strong> {movie.budget && movie.revenue ? `$${(movie.revenue - movie.budget).toLocaleString()}` : 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-8 justify-center">
            <button onClick={() => { watchOnYouTube(movie.title) }} className='cursor-pointer' >
              <FaYoutube className='w-10 h-10' color='red' />
            </button>

            <div onClick={() => { watchOnChannelMyanmar(movie.title) }} className='flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2 cursor-pointer'>
              <TbVideoMinus className='w-8 h-8' color='yellow' />

              <span className='text-amber-300'>Channel Myanmar</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Family-friendly genres (you can customize this list)
const familyFriendlyGenres = [10751, 16, 35, 10402]; // Family, Animation, Comedy, Music
const matureGenres = [27, 53, 80, 10752]; // Horror, Thriller, Crime, War

const getGenres = (genreIds) => {
  return genreIds.map(id => genreMap[id] || `Unknown Genre`).join(", ");
};

const isFamilyFriendly = (genreIds, isAdult) => {
  if (isAdult) return false;

  // Check if movie has any mature genres
  const hasMatureContent = genreIds.some(id => matureGenres.includes(id));
  if (hasMatureContent) return false;

  // Check if movie has family-friendly genres
  const hasFamilyGenres = genreIds.some(id => familyFriendlyGenres.includes(id));
  return hasFamilyGenres;
};

const getGenreBasedRating = (genreIds) => {
  if (genreIds.includes(27)) return { label: "HORROR", color: "bg-red-600" };
  if (genreIds.includes(53)) return { label: "THRILLER", color: "bg-orange-600" };
  if (genreIds.includes(28)) return { label: "ACTION", color: "bg-blue-600" };
  if (genreIds.includes(10751)) return { label: "FAMILY", color: "bg-green-600" };
  if (genreIds.includes(16)) return { label: "ANIMATION", color: "bg-purple-600" };
  if (genreIds.includes(35)) return { label: "COMEDY", color: "bg-yellow-600" };
  if (genreIds.includes(10749)) return { label: "ROMANCE", color: "bg-pink-600" };
  return null;
};

const MovieCard = ({ movie }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const familyFriendly = isFamilyFriendly(movie.genre_ids, movie.adult);
  const genreRating = getGenreBasedRating(movie.genre_ids);

  return (
    <div className="w-full max-w-80 min-h-96 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col mx-auto">
      <div className="relative h-32 bg-gradient-to-r from-blue-400 to-purple-500">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
          alt="No image available"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1 flex items-center">
          <Star className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" />
          <span className={`text-xs font-bold ${getRatingColor(movie.vote_average)}`}>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Genre-based rating badge */}
        {genreRating && (
          <div className={`absolute top-2 left-2 ${genreRating.color} text-white px-2 py-1 rounded text-xs font-bold`}>
            {genreRating.label}
          </div>
        )}

        {/* Family friendly badge */}
        {familyFriendly && (
          <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
            FAMILY SAFE
          </div>
        )}
      </div>

      {/* Movie Poster and Info */}
      <div className="relative px-4 py-3 flex-grow flex flex-col">
        <div className="flex items-start space-x-3">
          {/* Poster */}
          <div className="flex-shrink-0 -mt-10 z-10">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="w-16 h-24 object-cover rounded-lg shadow-lg border-2 border-white"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 pt-2 min-w-0">
            <div className="h-12 mb-2">
              <h2 className="text-lg font-bold text-gray-800 line-clamp-2 overflow-hidden">{movie.title}</h2>
            </div>

            <div className="flex items-center text-xs text-gray-600 mb-1">
              <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{formatDate(movie.release_date)}</span>
            </div>

            <div className="flex items-center text-xs text-gray-600 mb-1">
              <Film className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{getGenres(movie.genre_ids)}</span>
            </div>

            <div className="flex items-center text-xs text-gray-600">
              <Users className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{movie.vote_count.toLocaleString()} votes</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
            <span className="truncate">Pop: {movie.popularity.toFixed(0)}</span>
            <span className="truncate">ID: {movie.id}</span>
            <span className="truncate">{movie.original_language.toUpperCase()}</span>
          </div>

          {/* Action Button - Always at bottom */}
          <button
            onClick={() => setIsDetailsOpen(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-colors duration-200 text-center text-sm"
          >
            View Details
          </button>
        </div>
      </div>
      <MovieDetailsModal
        movie={movie}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default MovieCard;


