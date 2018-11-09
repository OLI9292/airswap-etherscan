import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, View } from "react-native"

import Search from "../Search"
import Text from "../Common/text"

import { Block } from "../../Interfaces/block"

import palette from "../../Lib/palette"

interface Props {
  block: Block
  navigation: any
}

class BlockComponent extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const { blockNumber } = this.props.block

    return (
      <View>
        <Search navigation={this.props.navigation} />
        <TouchableHighlight underlayColor={palette.transparent}>
          <Text.regular>{blockNumber}</Text.regular>
        </TouchableHighlight>
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  block: state.entities.block || []
})

export default connect(mapStateToProps)(BlockComponent)
