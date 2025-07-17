const SearchHistory = ({ history, onSelect }) => {
  return (
    <div className="search-history">
      <h3>Recent Searches</h3>
      <div className="history-items">
        {history.map((term, index) => (
          <button
            key={index}
            onClick={() => onSelect(term)}
            className="history-item"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchHistory
