import React from "react"
import { FlatList } from "react-native"
import { connect } from "react-redux"

import { ListSeparator } from "./components"

import { SearchType } from "../Home/index"
import TransactionItem from "../Transaction/item"

import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"

interface Props {
  transactions: (NormalTransaction | ERC20Transaction)[]
  search: (searchType: SearchType, searchValue: string) => void
}

class TransactionsList extends React.Component<Props, any> {
  render() {
    return (
      <FlatList
        height="100%"
        width="100%"
        data={this.props.transactions}
        keyExtractor={t => `${t.value}-${t.timeStamp}`}
        renderItem={({ item }) => (
          <TransactionItem search={this.props.search} transaction={item} />
        )}
        ItemSeparatorComponent={() => <ListSeparator />}
      />
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  transactions: state.entities.transactions || []
})

export default connect(mapStateToProps)(TransactionsList)
