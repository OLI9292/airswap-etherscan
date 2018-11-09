import React from "react"
import { View, StyleSheet } from "react-native"
import { groupBy, last } from "lodash"
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryLine
} from "victory-native"

import palette from "../../Lib/palette"

interface Props {
  data: any[]
}

interface State {
  data: any[]
  zoomDomain: Date[]
}

export default class Chart extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: []
    }
  }

  public componentDidMount() {
    const dates = this.props.data
      .map(({ timeStamp }) => new Date(parseInt(timeStamp) * 1000))
      .sort((a: any, b: any) => a - b)
    const zoomDomain = { x: [dates[0], last(dates)!] }
    const grouped = groupBy(dates, d => d.toISOString().slice(0, 10))
    const data = Object.keys(grouped).map(str => {
      const [y, d, m] = str.split("-").map(s => parseInt(s, 10))
      return { a: new Date(y, d, m), b: grouped[str].length }
    })

    if (data.length > 1) {
      this.setState({ data, zoomDomain })
    }
  }

  render() {
    const { data, zoomDomain } = this.state
    if (data.length === 0) return null

    return (
      <View style={styles.container}>
        <VictoryChart
          width={400}
          height={300}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={(domain: Date[]) => {
                this.setState({ zoomDomain: domain })
              }}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: palette.gray.primary }
            }}
            data={data}
            x="a"
            y="b"
          />
        </VictoryChart>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
})
