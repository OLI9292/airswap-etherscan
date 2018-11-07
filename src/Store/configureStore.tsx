import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import api from "../Middleware/api"
import rootReducer from "../Reducers"

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk, api))

export default configureStore
