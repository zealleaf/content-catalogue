/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LeafveinCatalogue } from '../../packages/catalogue/src/index'

const APP: React.FC = () => {
  return (
    <>
      <div className="doc">
        <h1>1</h1>
        <h2>2</h2>
        <h1>3</h1>
        <h2>4</h2>
        <h3>5</h3>
        <h1>6</h1>
      </div>
      <LeafveinCatalogue contentMark=".doc" />
    </>
  )
}

export default APP
