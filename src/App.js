import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchMoviesHandler = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await fetch('https://swapi.dev/api/films/')
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const data = await response.json()

            const transformedData = data.results.map(movieData => ({
                id: movieData.episode_id,
                title: movieData.title,
                openingText: movieData.opening_crawl,
                releaseDate: movieData.release_date
            }))
            setMovies(transformedData)
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    }

    return (
        <>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {!isLoading && !error && movies.length === 0 && <p>No movies to display</p>}
                {isLoading && <p>Loading..</p>}
                {!isLoading && error && <p>{error}</p>}
            </section>
        </>
    );
}

export default App;
