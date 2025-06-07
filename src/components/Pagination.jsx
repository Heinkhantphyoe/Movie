import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalResults, 
  onPageChange, 
  loading = false 
}) => {
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && !loading) {
      onPageChange(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    
    // Calculate start and end page numbers for visible buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="px-3 py-2 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
    );

    // First page button (if not in visible range)
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          disabled={loading}
          className="px-3 py-2 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-3 py-2 mx-1 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Visible page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={loading}
          className={`px-3 py-2 mx-1 rounded transition-colors ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Last page button (if not in visible range)
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-3 py-2 mx-1 text-gray-400">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          disabled={loading}
          className="px-3 py-2 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-3 py-2 mx-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    );

    return buttons;
  };

  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-8 mb-4">
      {/* Results info */}
      {totalResults > 0 && (
        <div className="text-gray-400 text-sm">
          Showing page {currentPage.toLocaleString()} of {totalPages.toLocaleString()} 
          ({totalResults.toLocaleString()} total results)
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center">
        {renderPaginationButtons()}
      </div>

      {/* Page jump input */}
      <div className="flex justify-center items-center">
        <span className="text-gray-400 text-sm mr-2">Jump to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          value={currentPage}
          onChange={(e) => {
            const page = parseInt(e.target.value);
            if (page && page >= 1 && page <= totalPages) {
              handlePageChange(page);
            }
          }}
          disabled={loading}
          className="w-20 px-2 py-1 bg-gray-700 text-white rounded text-center disabled:opacity-50"
        />
        <span className="text-gray-400 text-sm ml-2">
          of {totalPages.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default Pagination;