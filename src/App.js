
import React, { useEffect } from 'react'
import './App.css';
import { Link } from "react-router-dom"
import Skeleton from './components/Skeleton/skeleton'
import { characterSelector, fetchCharacters } from './slices/characteres'
import { useDispatch, useSelector } from 'react-redux'
import { isNull } from 'lodash'

function App() {
  const { characteres, loading, hasErrors } = useSelector(characterSelector)
  const dispatch = useDispatch()

  // dispatch our thunk when component first mounts
  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch])


  if (loading) return (<Skeleton />)
  if (hasErrors) return `Error: ${hasErrors.data}`

  return (
    <div className="App container card-columns">
      {!isNull(characteres) && characteres.results.map(post => (
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
