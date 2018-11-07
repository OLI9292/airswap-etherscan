import * as React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import styled from "styled-components/native"

import AppNavigator from "./AppNavigator"
import configureStore from "./src/Store/configureStore"
const store = configureStore()

export default class App extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}
