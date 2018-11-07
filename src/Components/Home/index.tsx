import React from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { SearchBar } from "react-native-elements"

import { Box } from "./components"
import Search from "../Search"

interface Props {
  dispatch: any
}

const ADDRESS = "0x75fe0f54c65ca39c23d82eb1bada90e4af99a39e"
const BLOCK = "2165403"

export default class Home extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  public async componentDidMount() {
    // this.search(SearchType.Block, BLOCK)
    // this.search(SearchType.NormalTransactions, ADDRESS)
  }

  render() {
    // const primaryComponent =
    //   searchType === SearchType.Block ? (
    //     <BlockComponent search={this.search.bind(this)} />
    //   ) : (
    //     <AddressComponent address={address} search={this.search.bind(this)} />
    //   )

    return (
      <Box>
        <Search />
        hello world
      </Box>
    )
  }
}
