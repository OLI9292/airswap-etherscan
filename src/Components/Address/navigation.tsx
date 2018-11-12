import React from "react"
import { Button } from "react-native"

import { AddressView } from "./"
import { ButtonBox, NavigationBox } from "./components"
import { colors } from "react-native-elements"
import palette from "../../Lib/palette"

interface Props {
  isViewing: AddressView
  setIsViewing: (isViewing: AddressView) => void
}

export default class Navigation extends React.Component<Props, any> {
  render() {
    const button = (addressView: AddressView, i: number) => {
      const color =
        this.props.isViewing === addressView ? "black" : palette.gray.light

      return (
        <ButtonBox key={i} color={color}>
          <Button
            color={color}
            title={String(addressView)}
            onPress={() => this.props.setIsViewing(addressView)}
          />
        </ButtonBox>
      )
    }

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
