import styled from "styled-components/native"

import Text from "../Common/text"
import palette from "../../Lib/palette"

export const TipText = styled(Text.regular)`
  color: ${palette.gray.medium};
  position: absolute;
  bottom: 30px;
  left: 20px;
  right: 20px;
  text-align: center;
`
