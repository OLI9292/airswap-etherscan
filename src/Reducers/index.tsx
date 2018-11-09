import * as ActionTypes from "../Actions"
import { combineReducers } from "redux"

import { _mergeWith } from "../Lib/helpers"

// Updates an entity cache in response to any action.
const entities = (state = {}, action: any) => {
  const { response } = action

  if (response) {
    return _mergeWith(state, response)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action: any) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  }

  if (error) {
    return error
  }

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage
})

export default rootReducer
