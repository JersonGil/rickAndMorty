import './App.css';
import { Link } from "react-router-dom"
import Skeleton from './components/Skeleton/skeleton'
import { useGetCharactersQuery } from './services/characteres'

function App() {
  const { isError, isLoading, data, error } = useGetCharactersQuery()

  if (isLoading) return (<Skeleton />)
  if (isError) return `Error: ${error}`

  return (
    <div className="App container card-columns">
      {data.characters.results.map(post => (
          <div className="card" key={post.id}>
            <div className="content">
              <img src={post.image} alt={`Imagen de ${post.name}`}/>
              <Link to={`character/${post.id}`}>
                <h1 className="m-2">{post.name}</h1>
              </Link>
              <p>{post.status}</p>
            </div>
          </div>
      ))}
    </div>
  );
}

export default App;
