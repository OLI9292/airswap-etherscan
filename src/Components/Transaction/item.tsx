import React from "react"
import { TouchableHighlight, View } from "react-native"

import { SearchType } from "../Home/index"
import { Box } from "./components"
import Text from "../Common/text"
import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"
import { convertValueToEth } from "../../Lib/helpers"
import palette from "../../Lib/palette"

interface Props {
  transaction: NormalTransaction | ERC20Transaction
  search: (searchType: SearchType, searchValue: string) => void
}

interface State {
  expanded?: boolean
}

export default class Item extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const { to, blockNumber, value, gasUsed, gasPrice } = this.props.transaction
    const { expanded } = this.state

    const tappableAddress = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.props.search(SearchType.NormalTransactions, to)}
      >
        <Text.regular>{to}</Text.regular>
      </TouchableHighlight>
    )

    const tappableBlock = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.props.search(SearchType.Block, String(blockNumber))}
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
