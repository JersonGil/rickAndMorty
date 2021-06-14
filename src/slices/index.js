import { combineReducers } from 'redux'

import charactersReducer from './characteres'

const rootReducer = combineReducers({
  characters: charactersReducer,
})

export default rootReducer