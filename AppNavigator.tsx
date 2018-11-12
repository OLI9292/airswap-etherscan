import React from "react"
import { createSwitchNavigator } from "react-navigation"

import Home from "./src/Components/Home"
import Address from "./src/Components/Address"
import Block from "./src/Components/Block"

export default createSwitchNavigator({
  Home: {
    screen: Home
  },
  Address: {
    screen: Address
  },
  Block: {
    screen: Block
  }
})
