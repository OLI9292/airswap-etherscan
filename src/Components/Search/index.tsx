import React from "react"
import { connect } from "react-redux"
import { SearchBar } from "react-native-elements"

import {
  fetchNormalTransactionsAction,
  fetchBlockAction,
  fetchERC20TransactionsAction
} from "../../Actions/index"

export enum SearchType {
  NormalTransactions,
  ERC20Transactions,
  Block
}

interface Props {
  dispatch: any
}

interface State {
  searchValue?: string
  isLoading?: boolean
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log("hi")
    this.state = {}
  }

  private async search(searchType: SearchType, searchValue: string) {
    // this.setState({ searchValue, isLoading: true, searchType })
    // if (searchType === SearchType.Block) {
    //   await this.props.dispatch(fetchBlockAction(searchValue))
    // } else {
    //   const address = searchValue
    //   const fn =
    //     searchType === SearchType.NormalTransactions
    //       ? fetchNormalTransactionsAction
    //       : fetchERC20TransactionsAction
    //   console.log(fn)
    //   await this.props.dispatch(fn(address))
    //   this.setState({ address })
    // }
    // this.setState({ isLoading: false })
  }

  render() {
    const { searchValue, isLoading } = this.state

    return (
      <SearchBar
        autoCorrect={false}
        lightTheme
        value={searchValue || ""}
        returnKeyType="search"
        onChangeText={e => this.setState({ searchValue: e })}
        onSubmitEditing={() => console.log("hi")}
        placeholder="Search Blocks, Addresses"
      />
    )
  }
}

export default connect()(Search)
