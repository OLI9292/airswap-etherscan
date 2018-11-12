export const CALL_API = "Call API"

import CONFIG from "../Lib/config"

const callApi = (
  api: string,
  endpoint: string,
  schema: any,
  method: string,
  data: any
) => {
  const fullUrl = CONFIG.ETHERSCAN_API_ROOT + endpoint
  const headers = { "Content-Type": "application/json" }
  const body = { method: method, body: JSON.stringify(data), headers: headers }

  return fetch(fullUrl, body).then((response: any) => {
    return response.json().then((json: any) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      if (json.status == 0) {
        return Promise.reject(json.message)
      }

      const result: any = { isLoading: false }
      result[schema] = json.result
      return result
    })
  })
}

export default (store: any) => (next: any) => (action: any) => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === "undefined") {
    return next(action)
  }

  let { endpoint } = callAPI
  const { api, schema, types, method, data, session } = callAPI

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState())
  }
  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.")
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.")
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.")
  }

  const actionWith = (data: any) => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType }))

  return callApi(api, endpoint, schema, method, data).then(
    response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          response: { transactions: [], block: undefined },
          type: failureType,
          error: error || "Something bad happened."
        })
      )
  )
}
