import * as React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import { Font } from "expo"

import AppNavigator from "./AppNavigator"
import configureStore from "./src/Store/configureStore"
const store = configureStore()

interface State {
  fontsAreLoaded?: boolean
}

export default class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  public async componentDidMount() {
    // Workaround to a tricky Expo font loading issue
    // - https://github.com/react-native-training/react-native-elements/issues/1005
    await Font.loadAsync({
      "Material Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      "Material Design Icons": require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
    this.setState({ fontsAreLoaded: true })
  }
  render() {
    return this.state.fontsAreLoaded ? (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    ) : null
  }
}
