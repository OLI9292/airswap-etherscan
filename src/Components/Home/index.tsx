import React from "react"
import { connect } from "react-redux"
import { View, Alert } from "react-native"
import sample from "lodash/sample"

import { TipText } from "./components"
import Search from "../Search"

import { fetchNormalTransactionsAction, loadQuery } from "../../Actions/index"

interface Props {
  navigation: any
  isScanning: boolean
}

const EXAMPLE_ADDRESS = "0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A"
const EXAMPLE_BLOCK = "2165403"

const ETHEREUM_FACTS = [
  "The Ethereum network is a distributed computing system that utilizes its own programming language, smart contracts, and blockchain",
  "About 1/2 of Initial Coin Offerings use Ethereum’s platform and are ERC-20 friendly tokens that can be stored in an Ethereum wallet.",
  "With Ethereum you need to pay “gas” for transactions (AKA a transaction fee).",
  "The Ethereum platform is open-source, meaning any developer can work on it or build off it.",
  "Ethereum is distributed and decentralized, meaning the whole network is held by those who use the platform and there is no central force."
]

class Home extends React.Component<any, any> {
  public componentDidMount() {
    Alert.alert(
      "Welcome!",
      "Use the search bar or QR code scanner to lookup blocks and addresses.",
      [
        { text: "OK" },
        {
          text: "Search Example Address",
          onPress: this.searchExampleAddress.bind(this)
        }
      ]
    )
  }

  private searchExampleAddress() {
    const address = EXAMPLE_ADDRESS
    this.props.dispatch(loadQuery(address))
    this.props.dispatch(fetchNormalTransactionsAction(address))
    this.props.navigation.navigate("Address")
  }

  render() {
    const { isScanning, navigation } = this.props
    if (isScanning) return <Search navigation={navigation} />

    return (
      <View style={{ flex: 1 }}>
        <Search navigation={navigation} />
        <TipText>{sample(ETHEREUM_FACTS)}</TipText>
      </View>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => ({
  isScanning: state.entities.isScanning === true
})

export default connect(mapStateToProps)(Home)
