import React from "react"
import { FlatList } from "react-native"

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

export default function(props: Props) {
  return (
    <FlatList
      height="100%"
      width="100%"
      data={props.transactions}
      keyExtractor={t => `${t.value}-${t.timeStamp}`}
      renderItem={({ item }) => (
        <TransactionItem search={props.search} transaction={item} />
      )}
      ItemSeparatorComponent={() => <ListSeparator />}
    />
  )
}
