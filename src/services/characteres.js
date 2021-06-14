// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'

export const graphqlBaseQuery = async (baseUrl, body) => {
    try {
      const result = await request(baseUrl, body)
      return { data: result }
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error.message } }
      }
      return { error: { status: 500, data: error } }
    }
}

const graphqlBaseQuery2 = ({ baseUrl }) => async ({ body }) => {
  try {
    const result = await request(baseUrl, body)
    return { data: result }
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error.message } }
    }
    return { error: { status: 500, data: error } }
  }
}

// Define a service using a base URL and expected endpoints
export const rickandmortyApi = createApi({
  reducerPath: 'rickandmortyApi',
  baseQuery: graphqlBaseQuery2({ baseUrl: 'https://rickandmortyapi.com/graphql/' }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => ({
        body: gql`
         query {
          characters {
            results {
                id
                name
                status
                image
            }
          }
         }
        `,
      }),
      characteresResponse: (response) => response.data,
    }),
    getCharacter: builder.query({
      query: (id) => ({
        body: gql`
         query {
          character(id: ${id}) {
            id
            name
            status
            species
            image
          }
         }
        `,
      }),
      characterResponse: (response) => response.data,
    }),
   })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCharactersQuery, useGetCharacterQuery } = rickandmortyApi