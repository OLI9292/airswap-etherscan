import styled from "styled-components/native"

import palette from "../../Lib/palette"

export const NavigationBox = styled.View`
  display: flex;
  flex-direction: row;
`

interface ButtonBoxProps {
  color: string
}

export const ButtonBox = styled.View`
  flex: 1;
  border-bottom-width: 1;
  border-bottom-color: ${(p: ButtonBoxProps) => p.color};
`
