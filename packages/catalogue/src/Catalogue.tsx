/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const style = css`
  font-size: 160px;
  background-color: #6f95d2;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: #38bf38;
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Catalogue: React.FC<{ children: any }> = (props) => {
  return (
    <>
      <div css={style}>{props.children}</div>
    </>
  )
}

export default Catalogue
