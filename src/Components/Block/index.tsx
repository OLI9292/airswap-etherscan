import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, View } from "react-native"

import Search from "../Search"
import Text from "../Common/text"
import { Box } from "./components"

import { loadQuery, fetchNormalTransactionsAction } from "../../Actions"

import { Block } from "../../Interfaces/block"

import palette from "../../Lib/palette"

interface Props {
  block: Block
  navigation: any
  dispatch: any
  error: any
  isScanning: boolean
}

class BlockComponent extends React.Component<Props, any> {
  private navigateToAddress() {
    const address = this.props.block.blockMiner
    this.props.dispatch(loadQuery(address))
    this.props.dispatch(fetchNormalTransactionsAction(address))
    this.props.navigation.navigate("Address")
  }

  render() {
    const { block, error, isScanning, navigation } = this.props
    if (isScanning) return <Search navigation={navigation} />

    return (
      <View style={{ flex: 1 }}>
        <Search navigation={navigation} />

        {error && (
          <Text.error margin="10px 0 0 0" center={true}>
            {error.message}
          </Text.error>
        )}

        {block && (
          <Box>
            <Text.large center={true}>Block no. {block.blockNumber}</Text.large>
            <TouchableHighlight
              underlayColor={palette.transparent}
              onPress={this.navigateToAddress.bind(this)}
            >
              <Text.regular numberOfLines={1} margin="20px 0 10px 0">
                Miner: {block.blockMiner}
              </Text.regular>
            </TouchableHighlight>
            <Text.regular>Reward: {block.blockReward}</Text.regular>
          </Box>
        )}
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  block: state.entities.block,
  error: state.errorMessage,
  isScanning: state.entities.isScanning === true
})

export default connect(mapStateToProps)(BlockComponent)
