import React from "react"
import { connect } from "react-redux"
import { ActivityIndicator, View } from "react-native"

import Search from "../Search"
import Text from "../Common/text"
import Navigation from "./navigation"
import Overview from "./overview"
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
  error: any
  isScanning: boolean
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

  public setIsViewing(isViewing: AddressView) {
    this.setState({ isViewing })
    const { query } = this.props
    if (!query) return
    this.props.dispatch(loadQuery(query))
    const fn =
      isViewing === AddressView.ERC20
        ? fetchERC20TransactionsAction
        : fetchNormalTransactionsAction
    this.props.dispatch(fn(query))
  }

  render() {
    const {
      isLoading,
      navigation,
      transactions,
      error,
      isScanning
    } = this.props
    if (isScanning) return <Search navigation={navigation} />

    const { isViewing } = this.state

    const addressView =
      isViewing === AddressView.Overview ? (
        <Overview />
      ) : (
        <TransactionsList navigation={navigation} />
      )

    return (
      <View style={{ flex: 1 }}>
        <Search navigation={navigation} />

        <Navigation
          isViewing={isViewing}
          setIsViewing={this.setIsViewing.bind(this)}
        />

        {error && (
          <Text.error margin="20px" center={true}>
            {error.message}
          </Text.error>
        )}

        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          addressView
        )}
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoading: state.entities.isLoading,
  transactions: state.entities.transactions || [],
  query: state.entities.query,
  error: state.errorMessage,
  isScanning: state.entities.isScanning === true
})

export default connect(mapStateToProps)(Address)
