const Pagination = ({
  previousPage,
  nextPage,
  fetchPage,
}) => {
  return (
    <div className="mt-6 flex gap-3">
      <button
        onClick={() => fetchPage(previousPage)}
        disabled={!previousPage}
        className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <button
        onClick={() => fetchPage(nextPage)}
        disabled={!nextPage}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;