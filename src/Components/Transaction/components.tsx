import styled from "styled-components/native"

import palette from "../../Lib/palette"

interface ExpandProps {
  expanded: boolean
}

export const Expand = styled.View`
  height: 100%;
  width: 3px;
  border-radius: 3;
  position: absolute;
  background-color: ${(p: ExpandProps) =>
    p.expanded ? palette.blue : palette.gray.light};
`
export const Box = styled.View`
  margin: 20px 10px;
  padding-right: 20px;
  display: flex;
  background-color: white;
  flex-direction: row;
  position: relative;
  align-items: center;
`

export const ListSeparator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${palette.gray.light};
`
