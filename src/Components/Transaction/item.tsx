import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, View } from "react-native"

import { Box } from "./components"
import Text from "../Common/text"
import {
  fetchNormalTransactionsAction,
  fetchBlockAction,
  loadQuery
} from "../../Actions/index"
import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"
import { convertValueToEth } from "../../Lib/helpers"
import palette from "../../Lib/palette"

interface Props {
  dispatch: any
  transaction: NormalTransaction | ERC20Transaction
  navigation: any
}

interface State {
  expanded?: boolean
}

class Item extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  private navigate(value: string, screen: string) {
    this.props.dispatch(loadQuery(value))
    const fn =
      screen === "Block" ? fetchBlockAction : fetchNormalTransactionsAction
    this.props.dispatch(fn(value))
    this.props.navigation.navigate(screen)
  }

  render() {
    const { to, blockNumber, value, gasUsed, gasPrice } = this.props.transaction
    const { expanded } = this.state

    const tappableAddress = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.navigate(to, "Address")}
      >
        <Text.regular>{to}</Text.regular>
      </TouchableHighlight>
    )

    const tappableBlock = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.navigate(String(blockNumber), "Block")}
      >
        <Text.regular>{blockNumber}</Text.regular>
      </TouchableHighlight>
    )

    return (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.setState({ expanded: true })}
      >
        <Box expanded={expanded}>
          <Text.regular>{convertValueToEth(value)} Eth to</Text.regular>
          {tappableAddress}

          {expanded && (
            <View>
              <Text.regular>Gas used: {gasUsed}</Text.regular>
              <Text.regular>Gas price: {gasPrice}</Text.regular>
            </View>
          )}

          {tappableBlock}
        </Box>
      </TouchableHighlight>
    )
  }
}

export default connect()(Item)
