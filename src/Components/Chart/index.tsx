import React from "react"
import { groupBy, last } from "lodash"
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis
} from "victory-native"

import Text from "../Common/text"

import palette from "../../Lib/palette"

interface Props {
  data: any[]
}

interface State {
  data: any[]
  domain: any
}

const updateMonth = (date: Date, amount: number) =>
  date.setMonth(date.getMonth() + amount)

const parseDates = (originalData: any[]): any => {
  const dates = originalData
    .map(({ timeStamp }) => new Date(parseInt(timeStamp) * 1000))
    .sort((a: any, b: any) => a - b)
  // Set beginning / end for x-axis
  const beginning = new Date(dates[0].getTime())
  const end = new Date(last(dates)!)
  updateMonth(beginning, -2)
  updateMonth(end, 2)
  const domain = { x: [beginning, end] }
  // Group dates of transactions by month
  const grouped = groupBy(dates, d => d.toISOString().slice(0, 10))
  const data = Object.keys(grouped).map(str => {
    const [y, d, m] = str.split("-").map(s => parseInt(s, 10))
    return { a: new Date(y, d, m), b: grouped[str].length }
  })
  return { data, domain }
}

export default class Chart extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: []
    }
  }

  public componentDidMount() {
    this.setUpChart(this.props.data)
  }

  public componentWillReceiveProps(nextProps: Props) {
    if (nextProps.data.length !== this.props.data.length) {
      this.setUpChart(nextProps.data)
    }
  }

  private setUpChart(originalData: any[]) {
    const { data, domain } = parseDates(originalData)
    this.setState({ data, domain })
  }

  render() {
    const { data, domain } = this.state
    if (data.length === 0) return null

    return (
      <VictoryChart
        width={400}
        height={300}
        domain={domain}
        theme={VictoryTheme.material}
        scale={{ x: "time" }}
      >
        <VictoryBar
          barRatio={0.5}
          style={{
            data: { fill: palette.gray.medium }
          }}
          data={data}
          x="a"
          y="b"
          x0={(t: any) => "hey"}
        />
      </VictoryChart>
    )
  }
}
