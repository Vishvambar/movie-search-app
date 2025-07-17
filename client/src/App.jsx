import MovieSearch from './components/MovieSearch'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <header className="app-header">
          <h1>Movie Search App</h1>
        </header>
        <main>
          <MovieSearch />
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
