import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import Skeleton from './Skeleton/skeleton'

const getLocation = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      name
      dimension
      residents {
        name
        image
        status
        species
        type
      }
    }
  }
`

export default function Residents() {
  const { id } = useParams()
  const { loading, data, error } = useQuery(getLocation, { variables: { id }} )
  if (loading) return (<Skeleton/>)
  if (error) return `Error: ${error}`
  
  return (
    <div className="App container">
      <h1>{data.location.name}</h1>
      <h4>{data.location.dimension}</h4>
      {data.location.residents.map(post => (
        <div className="row justify-content-center mt-5" key={post.id}>
          <div className="card">
            <div className="content">
              <img src={post.image} alt={`Imagen de ${post.name}`}/>
              <h1 className="m-2">{post.name}</h1>
              <p>status: {post.status || 'unknown'}</p>
              <p>specie: {post.species || 'unknown'}</p>
              <p>type: {post.type || 'unknown'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}