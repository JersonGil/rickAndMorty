import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import Skeleton2 from './Skeleton/skeleton2'

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
  const { loading, data, error } = useQuery(getLocation, { variables: { id }, fetchPolicy: "network-only"} )
  if (loading) return (<Skeleton2/>)
  if (error) return `Error: ${error}`
  
  return (
    <React.Fragment>
      <div className="container-title mt-5">
        <h1>{data.location.name}</h1>
        <h4>{data.location.dimension}</h4>
      </div>
      <div className="App container card-columns justify-content-center">
        {data.location.residents.map(post => (
            <div className="card" key={post.id}>
              <div className="content">
                <img src={post.image} alt={`Imagen de ${post.name}`}/>
                <h1 className="name-resident m-2">{post.name}</h1>
                <p>status: {post.status || 'unknown'}</p>
                <p>specie: {post.species || 'unknown'}</p>
                <p>type: {post.type || 'unknown'}</p>
              </div>
            </div>
        ))}
      </div>
    </React.Fragment>
  )
}