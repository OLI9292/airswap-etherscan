import React from "react"
import { Button, View } from "react-native"

import { AddressView } from "./"
import { NavigationBox } from "./components"
import { colors } from "react-native-elements"
import palette from "../../Lib/palette"

interface Props {
  isViewing: AddressView
  setIsViewing: (isViewing: AddressView) => void
}

export default class Navigation extends React.Component<Props, any> {
  render() {
    const { isViewing } = this.props

    const button = (addressView: AddressView, i: number) => (
      <View key={i} style={{ flex: 1 }}>
        <Button
          color={isViewing === addressView ? "black" : palette.gray.light}
          title={String(addressView)}
          onPress={() => this.props.setIsViewing(addressView)}
        />
      </View>
    )

    return (
      <NavigationBox>
        {[
          AddressView.Transactions,
          AddressView.Overview,
          AddressView.ERC20
        ].map(button)}
      </NavigationBox>
    )
  }
}
