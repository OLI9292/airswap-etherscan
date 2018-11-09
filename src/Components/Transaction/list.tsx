import React from "react"
import { FlatList } from "react-native"
import { connect } from "react-redux"
import merge from "lodash/merge"

import { ListSeparator } from "./components"

import TransactionItem from "../Transaction/item"

import {
  NormalTransaction,
  ERC20Transaction
} from "../../Interfaces/transaction"

interface Props {
  navigation: any
  transactions: (NormalTransaction | ERC20Transaction)[]
}

class TransactionsList extends React.Component<Props, any> {
  render() {
    return (
      <FlatList
        height="100%"
        width="100%"
        data={this.props.transactions.map((t, idx) => merge({}, t, { idx }))}
        keyExtractor={t => String(t.idx)}
        renderItem={({ item }) => (
          <TransactionItem
            navigation={this.props.navigation}
            transaction={item}
          />
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
