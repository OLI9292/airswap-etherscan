import React from "react"
import { createStackNavigator } from "react-navigation"

import Address from "./src/Components/Address"
import Block from "./src/Components/Block"
import Home from "./src/Components/Home"
import Search from "./src/Components/Search"

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Address: {
      screen: Address
    },
    Block: {
      screen: Block
    }
  },
  {
    navigationOptions: {
      headerTitle: <Search />
    }
  }
)
