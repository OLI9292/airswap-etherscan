import * as ActionTypes from "../Actions"
import { combineReducers } from "redux"
import { get, merge, omit } from "lodash"

import { _mergeWith } from "../Lib/helpers"

const SCHEMAS = ["block", "transactions"]

const ERRORS = {
  NOTOK: "Token not found.",
  "No transactions found": "No transactions found."
}

// Updates an entity cache in response to any action.
const entities = (state: any = {}, action: any) => {
  const { response, error } = action

  if (response) {
    return _mergeWith(state, response)
  }

  return omit(merge(state, { isLoading: false }), SCHEMAS)
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action: any) => {
  const { type, error } = action

  if (error) {
    const message = get(ERRORS, error, "Something bad happened.")
    return merge(state, { message })
  }

  return null
}

const rootReducer = combineReducers({
  entities,
  errorMessage
})

export default rootReducer
