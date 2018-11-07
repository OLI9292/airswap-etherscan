import styled from "styled-components/native"

import palette from "../../Lib/palette"

interface BoxProps {
  expanded?: boolean
}

export const Box = styled.View`
  width: 100%;
  display: flex;
  background-color: white;
`

export const ListSeparator = styled.View`
  height: 5;
  background-color: ${palette.gray.light};
`
