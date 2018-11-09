import React from "react"
import { connect } from "react-redux"
import { ActivityIndicator, View } from "react-native"

import Search from "../Search"
import Chart from "../Chart"
import Text from "../Common/text"
import Navigation from "./navigation"
import TransactionsList from "../Transaction/list"

import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"

import {
  fetchNormalTransactionsAction,
  fetchERC20TransactionsAction,
  loadQuery
} from "../../Actions/index"

export enum AddressView {
  Overview = "Overview",
  Transactions = "Transactions",
  ERC20 = "ERC20"
}

interface Props {
  address?: string
  navigation: any
  transactions: (NormalTransaction | ERC20Transaction)[]
  isLoading: boolean
  dispatch: any
  query?: string
}

interface State {
  isViewing: AddressView
}

class Address extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isViewing: AddressView.Transactions
    }
  }

  componentDidMount() {}

  public setIsViewing(isViewing: AddressView) {
    this.setState({ isViewing })
    const { query } = this.props
    if (!query) return

    this.props.dispatch(loadQuery(query))

    if (isViewing === AddressView.ERC20) {
      this.props.dispatch(fetchERC20TransactionsAction(query))
    } else {
      this.props.dispatch(fetchNormalTransactionsAction(query))
    }
  }

  render() {
    const { isLoading, navigation, transactions } = this.props
    const { isViewing } = this.state

    const overView = (
      <View>
        <Text.regular>{transactions.length} transactions</Text.regular>
        <Chart data={transactions} />
      </View>
    )

    return (
      <View>
        <Search navigation={navigation} />
        <Navigation
          isViewing={isViewing}
          setIsViewing={this.setIsViewing.bind(this)}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : isViewing === AddressView.Overview ? (
          overView
        ) : (
          <TransactionsList navigation={navigation} />
        )}
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoading: state.entities.isLoading,
  transactions: state.entities.transactions || [],
  query: state.entities.query
})

export default connect(mapStateToProps)(Address)
