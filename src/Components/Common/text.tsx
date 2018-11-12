import styled from "styled-components/native"

import palette from "../../Lib/palette"

interface Props {
  color?: string
  center?: boolean
  margin?: string
}

const Regular = styled.Text`
  color: ${(p: Props) => p.color || "black"};
  font-size: 14px;
  text-align: ${(p: Props) => (p.center ? "center" : "left")};
  margin: ${(p: Props) => p.margin || 0};
`

const ErrorMessage = styled(Regular)`
  color: ${(p: Props) => palette.red};
`

const Large = styled(Regular)`
  font-size: 18px;
`

const Small = styled(Regular)`
  font-size: 12px;
`

export default {
  regular: Regular,
  large: Large,
  small: Small,
  error: ErrorMessage
}
