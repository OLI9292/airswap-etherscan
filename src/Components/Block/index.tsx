import React from "react"
import { connect } from "react-redux"
import { TouchableHighlight, View } from "react-native"

import Text from "../Common/text"
import { SearchType } from "../Home/index"
import { Block } from "../../Interfaces/block"
import palette from "../../Lib/palette"

interface Props {
  block: Block
  search: (searchType: SearchType, searchValue: string) => void
}

class BlockComponent extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const { blockNumber } = this.props.block

    return (
      <TouchableHighlight underlayColor={palette.transparent}>
        <Text.regular>{blockNumber}</Text.regular>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  block: state.entities.block || []
})

export default connect(mapStateToProps)(BlockComponent)
