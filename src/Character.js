import React from 'react'
import { useGetCharacterQuery } from './services/characteres'
import { useParams } from 'react-router-dom'
import Skeleton from './components/Skeleton/skeleton'

export default function Character() {
  const { id } = useParams()
  const { isError, isLoading, data, error } = useGetCharacterQuery(id)
  if (isLoading) return (<Skeleton/>)
  if (isError) return `Error: ${error}`
  
  return (
    <div className="App container mt-5">
        <div className="row justify-content-center">
            <div className="card">
                <div className="content">
                    <img src={data.character.image} alt={`Imagen de ${data.character.name}`}/>
                    <h1>{data.character.name}</h1>
                    <p>{data.character.status}</p>
                </div>
            </div>    
        </div>
    </div>
  )
}