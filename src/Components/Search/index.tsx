import React from "react"
import { StyleSheet } from "react-native"
import { connect } from "react-redux"
import { SearchBar } from "react-native-elements"

import {
  fetchNormalTransactionsAction,
  fetchBlockAction,
  loadQuery
} from "../../Actions/index"

import styles from "./styles"

interface Props {
  dispatch: any
  navigation: any
  query?: string
}

interface State {
  searchValue?: string
}

const ADDRESS = "0x75fe0f54c65ca39c23d82eb1bada90e4af99a39e"
const BLOCK = "2165403"

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.query) {
      this.setState({ searchValue: nextProps.query })
    }
  }

  private async search(
    searchValue: string = "0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A"
  ) {
    if (!searchValue) return
    const isSearchingBlock = searchValue.length < 20
    this.props.dispatch(loadQuery(searchValue))

    if (isSearchingBlock) {
      await this.props.dispatch(fetchBlockAction(searchValue))
      // this.props.navigation.navigate("Block")
    } else {
      await this.props.dispatch(fetchNormalTransactionsAction(searchValue))
      // this.props.navigation.navigate("Address")
    }
  }

  render() {
    return (
      <SearchBar
        containerStyle={styles.container}
        inputStyle={styles.input}
        searchIcon={{
          type: "Material Design Icons",
          color: "#86939e",
          name: "search"
        }}
        platform="ios"
        leftIconContainerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        autoCorrect={false}
        lightTheme
        value={this.state.searchValue || this.props.query}
        returnKeyType="search"
        onChangeText={searchValue => this.setState({ searchValue })}
        onSubmitEditing={() => this.search(this.state.searchValue)}
        placeholder="Search Blocks, Addresses"
      />
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoading: state.entities.isLoading,
  query: state.entities.query
})

export default connect(mapStateToProps)(Search)
