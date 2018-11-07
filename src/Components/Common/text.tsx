import styled from "styled-components/native"

const Regular = styled.Text``

const Large = styled(Regular)`
  font-size: 32px;
`

export default {
  regular: Regular,
  large: Large
}
