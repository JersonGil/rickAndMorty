import './App.css';
import { gql, useQuery } from '@apollo/client'
import { Link } from "react-router-dom"
import Skeleton from './components/Skeleton/skeleton'
//  import Location from './components/Skeleton/Location'
const getCharacters = gql`
query getCharacters {
  characters {
    results {
      id
      name
      status
      image
    }
  }
}
`

function App() {
  const { loading, data, error } = useQuery(getCharacters)
 if (loading) return (<Skeleton />)
  if (error) return `Error: ${error}`

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
