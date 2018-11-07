import React from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { connect } from "react-redux"
import { SearchBar } from "react-native-elements"

import { Box } from "./components"
import TransactionsList from "../Transaction/list"
import BlockComponent from "../Block"
import Text from "../Common/text"

import {
  fetchNormalTransactionsAction,
  fetchBlockAction
} from "../../Actions/index"

import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"
import { Block } from "../../Interfaces/block"

export enum SearchType {
  NormalTransactions,
  ERC20Transactions,
  Block
}

interface Props {
  dispatch: any
  transactions: (NormalTransaction | ERC20Transaction)[]
  block: Block
}

interface State {
  searchValue?: string
  isLoading?: boolean
  searchType?: SearchType
}

const ADDRESS = "0x75fe0f54c65ca39c23d82eb1bada90e4af99a39e"
const BLOCK = "2165403"

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  public async componentDidMount() {
    // this.search(SearchType.Block, BLOCK)
    // this.search(SearchType.NormalTransactions, ADDRESS)
  }

  private async search(searchType: SearchType, searchValue: string) {
    this.setState({ searchValue, isLoading: true, searchType })

    if (searchType === SearchType.NormalTransactions) {
      await this.props.dispatch(fetchNormalTransactionsAction(searchValue))
    } else if (searchType === SearchType.Block) {
      await this.props.dispatch(fetchBlockAction(searchValue))
    }

    this.setState({ isLoading: false })
  }

  render() {
    const { searchValue, isLoading, searchType } = this.state
    const { block, transactions } = this.props

    const primaryComponent =
      searchType === SearchType.Block ? (
        <BlockComponent block={block} search={this.search.bind(this)} />
      ) : (
        <TransactionsList
          transactions={transactions}
          search={this.search.bind(this)}
        />
      )

    return (
      <Box>
        <SearchBar
          autoCorrect={false}
          lightTheme
          value={searchValue || ""}
          returnKeyType="search"
          onChangeText={e => this.setState({ searchValue: e })}
          onSubmitEditing={() => console.log("hi")}
          placeholder="Search Blocks, Addresses"
        />
        {isLoading ? <ActivityIndicator /> : primaryComponent}
      </Box>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  transactions: state.entities.transactions || [],
  block: state.entities.block
})

export default connect(mapStateToProps)(Home)
