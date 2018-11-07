import React from "react"
import { View } from "react-native"

import { SearchType } from "../Home/index"
import Navigation from "./navigation"
import TransactionsList from "../Transaction/list"

import {
  fetchNormalTransactionsAction,
  fetchERC20TransactionsAction
} from "../../Actions/index"

export enum AddressView {
  Overview = "Overview",
  Transactions = "Transactions",
  ERC20 = "ERC20"
}

interface Props {
  search: (searchType: SearchType, searchValue: string) => void
  address?: string
}

interface State {
  isViewing: AddressView
}

export default class AddressComponent extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isViewing: AddressView.Transactions
    }
  }

  public setIsViewing(isViewing: AddressView) {
    // const address = this.props.address
    // let searchType: SearchType | undefined
    // if (isViewing === AddressView.Transactions) {
    //   searchType = SearchType.NormalTransactions
    //   await this.props.dispatch(fn(address))
    // } else if (isViewing === AddressView.ERC20) {
    //   searchType = SearchType.ERC20Transactions
    // }
    // if (searchType !== undefined && address) {
    //   this.props.search(searchType, address)
    // }
    // this.setState({ isViewing })
  }

  render() {
    return (
      <View>
        <Navigation
          isViewing={this.state.isViewing}
          setIsViewing={this.setIsViewing.bind(this)}
        />
        <TransactionsList search={this.props.search.bind(this)} />
      </View>
    )
  }
}
