import React from "react"
import { View, TouchableHighlight, StyleSheet, Text } from "react-native"
import { connect } from "react-redux"
import { SearchBar } from "react-native-elements"
import { BarCodeScanner } from "expo"

import {
  Box,
  IconBox,
  IconBoxBottomLeft,
  Icon,
  searchBarStyles
} from "./components"
import styles from "./styles"

import qrIcon from "../../Lib/Images/qr-code.png"
import backArrow from "../../Lib/Images/back-arrow.png"

import {
  fetchNormalTransactionsAction,
  fetchBlockAction,
  loadQuery,
  setIsScanning
} from "../../Actions/index"
import palette from "../../Lib/palette"

interface Props {
  dispatch: any
  navigation: any
  query?: string
  isLoading: boolean
  isScanning: boolean
}

interface State {
  searchValue?: string
}

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

  private search(searchValue: string) {
    if (!searchValue || this.props.isLoading) return
    const isSearchingBlock = searchValue.length < 20
    this.props.dispatch(loadQuery(searchValue))

    if (isSearchingBlock) {
      this.props.dispatch(fetchBlockAction(searchValue))
      this.props.navigation.navigate("Block")
    } else {
      this.props.dispatch(fetchNormalTransactionsAction(searchValue))
      this.props.navigation.navigate("Address")
    }
  }

  render() {
    const { searchValue } = this.state
    const { isScanning } = this.props

    if (isScanning) {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeRead={(e: any) => this.search(e.data)}
            style={StyleSheet.absoluteFill}
          />
          <IconBoxBottomLeft>
            <TouchableHighlight
              onPress={() => this.props.dispatch(setIsScanning(false))}
            >
              <Icon large={true} source={backArrow} />
            </TouchableHighlight>
          </IconBoxBottomLeft>
        </View>
      )
    }

    return (
      <Box>
        <View flex={1}>
          <IconBox>
            <TouchableHighlight
              onPress={() => this.props.dispatch(setIsScanning(true))}
            >
              <Icon source={qrIcon} />
            </TouchableHighlight>
          </IconBox>
        </View>

        <SearchBar
          containerStyle={searchBarStyles.container}
          inputStyle={searchBarStyles.input}
          searchIcon={{
            type: "Material Design Icons",
            color: "#86939e",
            name: "search"
          }}
          platform="ios"
          leftIconContainerStyle={searchBarStyles.input}
          inputContainerStyle={searchBarStyles.inputContainer}
          autoCorrect={false}
          lightTheme
          value={searchValue !== undefined ? searchValue : this.props.query}
          returnKeyType="search"
          onChangeText={newSearchValue =>
            this.setState({ searchValue: newSearchValue })
          }
          onSubmitEditing={() => this.search(searchValue)}
          onClear={() => this.setState({ searchValue: "" })}
          placeholder="Search Blocks, Addresses"
        />
      </Box>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isLoading: state.entities.isLoading,
  query: state.entities.query,
  isScanning: state.entities.isScanning === true
})

export default connect(mapStateToProps)(Search)
