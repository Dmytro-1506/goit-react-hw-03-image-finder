export const Searchbar = () => {
    const searchImages = (event) => {
        event.preventDefault()
        console.log('hallo');
        event.target.reset()
    }
    return <header className="Searchbar">
        <form className="SearchForm" onSubmit={searchImages}>
            <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
            </button>

            <input
                className="SearchForm-input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
            />
        </form>
    </header>
}