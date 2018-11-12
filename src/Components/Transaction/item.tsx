import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, View } from "react-native"

import { Expand, Box } from "./components"
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

import palette from "../../Lib/palette"

interface Props {
  dispatch: any
  transaction: NormalTransaction | ERC20Transaction
  navigation: any
  query: string
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
    const { expanded } = this.state
    const { transaction, query } = this.props

    const {
      to,
      from,
      blockNumber,
      value,
      gasUsed,
      gasPrice,
      timeStamp,
      confirmations,
      nonce
    } = transaction

    const isRecipient = query.toLowerCase() === to
    const [address, direction] = isRecipient ? [from, "from"] : [to, "to"]

    const expandButton = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        style={{ height: "100%", width: 25 }}
        onPress={() => this.setState({ expanded: !expanded })}
      >
        <Expand expanded={expanded} />
      </TouchableHighlight>
    )

    const tappableAddress = (
      <TouchableHighlight
        underlayColor={palette.transparent}
        onPress={() => this.navigate(address, "Address")}
      >
        <Text.regular numberOfLines={1}>{address}</Text.regular>
      </TouchableHighlight>
    )

    const expandedData = (
      <View style={{ marginTop: 8 }}>
        <Text.small margin="0 0 8px 0">
          {new Date(parseInt(timeStamp) * 1000).toLocaleDateString()}
        </Text.small>
        <Text.small>Gas used: {gasUsed}</Text.small>
        <Text.small>Gas price: {gasPrice}</Text.small>
        <Text.small>Nonce: {nonce}</Text.small>
        <Text.small>Confirmations: {confirmations}</Text.small>
      </View>
    )

    const tappableBlock = (
      <TouchableHighlight
        style={{ marginTop: 8 }}
        underlayColor={palette.transparent}
        onPress={() => this.navigate(String(blockNumber), "Block")}
      >
        <Text.small color={palette.gray.medium}>
          Block no. {blockNumber}
        </Text.small>
      </TouchableHighlight>
    )

    return (
      <Box>
        {expandButton}
        <View>
          <Text.regular color={isRecipient ? palette.green : palette.red}>
            {value} Eth
            <Text.regular> {direction}</Text.regular>
          </Text.regular>
          {tappableAddress}
          {expanded && expandedData}
          {tappableBlock}
        </View>
      </Box>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  query: state.entities.query
})

export default connect(mapStateToProps)(Item)
