import styled from "styled-components/native"

import palette from "../../Lib/palette"

export const Box = styled.View`
  margin-top: 30;
  margin-left: 5;
  height: 60;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
`

export const IconBox = styled.View`
  height: 38;
  width: 38;
  border-radius: 8;
  border-color: ${palette.gray.medium};
  border-width: 1;
  display: flex;
  align-items: center;
  z-index: 10;
  justify-content: center;
`

export const IconBoxBottomLeft = styled(IconBox)`
  position: absolute;
  background-color: white;
  height: 42;
  width: 42;
  border-radius: 30;
  bottom: 20;
  left: 15;
`

interface IconProps {
  large?: boolean
}

export const Icon = styled.Image`
  width: ${(p: IconProps) => (p.large ? "30px" : "25px")};
  height: ${(p: IconProps) => (p.large ? "30px" : "25px")};
`

export const searchBarStyles = {
  container: {
    flex: 11,
    borderRadius: 0,
    backgroundColor: palette.transparent
  },
  inputContainer: {
    borderRadius: 8,
    height: 38,
    backgroundColor: palette.gray.light
  },
  input: {
    height: 38,
    backgroundColor: palette.gray.light
  }
}
