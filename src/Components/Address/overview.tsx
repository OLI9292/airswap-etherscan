import React from "react"
import { connect } from "react-redux"
import { View } from "react-native"
import { partition, sum } from "lodash"

import Chart from "../Chart"
import Text from "../Common/text"

import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"

import { convertValueToEth } from "../../Lib/helpers"

interface Props {
  transactions: (NormalTransaction | ERC20Transaction)[]
  query: string
}

class Overview extends React.Component<Props, any> {
  render() {
    const { transactions, query } = this.props

    const chart = (
      <View>
        <Text.large margin="30px 0 -30px 0" center={true}>
          # Transactions / month
        </Text.large>
        <Chart data={transactions} />
      </View>
    )

    const [ethReceived, ethSent] = partition(
      transactions,
      t => query.toLowerCase() === t.to
    ).map(group =>
      Number(sum(group.map(t => convertValueToEth(t.value))).toFixed(2))
    )

    const stats = (
      <View>
        <Text.regular margin="2px 0">
          Total # transactions: {transactions.length}
        </Text.regular>
        <Text.regular margin="2px 0">
          Total Eth received: {ethReceived}
        </Text.regular>
        <Text.regular margin="2px 0">Total Eth sent: {ethSent}</Text.regular>
      </View>
    )

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {transactions.length > 1 && chart}
        {stats}
      </View>
    )
  }
}

// total # transactions
// total eth sent
// total eth recieved

const mapStateToProps = (state: any, ownProps: any) => ({
  transactions: state.entities.transactions || [],
  query: state.entities.query
})

export default connect(mapStateToProps)(Overview)
