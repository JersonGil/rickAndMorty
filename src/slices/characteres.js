import { createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from '../services/characteres'
import { gql } from 'graphql-request'

export const initialState = {
  loading: false,
  hasErrors: false,
  characteres: null,
}

// A slice for recipes with our 3 reducers
const charactersSlice = createSlice({
  name: 'characteres',
  initialState,
  reducers: {
    getCharacteres: state => {
      state.loading = true
    },
    getCharacteresSuccess: (state, { payload }) => {
      state.characteres = payload.characters
      state.loading = false
      state.hasErrors = false
    },
    getCharacteresFailure: (state, { payload }) => {
      state.loading = false
      state.hasErrors = payload
    },
  },
})

// The reducer
export default charactersSlice.reducer

// A Selector 
export const characterSelector = state => state.rootReducer.characters

// Three actions generated from the slice
export const { getCharacteres, getCharacteresSuccess, getCharacteresFailure } = charactersSlice.actions

// Asynchronous thunk action
export function fetchCharacters() {
  return async dispatch => {
    dispatch(getCharacteres())
    const body = gql`
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
    `
    try {
      const response = await graphqlBaseQuery('https://rickandmortyapi.com/graphql/', body)
      if (response.error) { 
        dispatch(getCharacteresFailure(response.error))
        return
      }
      if (response.data) {
        dispatch(getCharacteresSuccess(response.data))
        return
      }
    } catch (error) {
      dispatch(getCharacteresFailure(error))
    }
  }
}