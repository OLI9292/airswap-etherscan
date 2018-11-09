import React from "react"
import { StyleSheet, View } from "react-native"
import { BarCodeScanner, Permissions } from "expo"

import Search from "../Search"

interface Props {
  navigation: any
}

export default class Home extends React.Component<any, any> {
  render() {
    return <View style={{ flex: 1, borderRadius: 0 }} />
  }
}

Home
/*
        <BarCodeScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          onBarCodeRead={(e: any) =>
            alert(
              `Bar code with type ${e.type} and data ${
                e.data
              } has been scanned!`
            )
          }
          style={StyleSheet.absoluteFill}
        />
*/
