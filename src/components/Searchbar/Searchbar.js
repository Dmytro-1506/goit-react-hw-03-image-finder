export const Searchbar = ({ prevRequest, onSubmit }) => {
    const checkRequest = (event) => {
        event.preventDefault();
        const requestName = event.target.searchInput.value
        if (prevRequest !== requestName) { onSubmit(requestName) }
        event.target.reset();
    }
    return <header className="Searchbar">
        <form className="SearchForm" onSubmit={checkRequest}>
            <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
            </button>

            <input
                className="SearchForm-input"
                type="text"
                name="searchInput"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
}