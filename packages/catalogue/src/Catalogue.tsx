/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import scanner from './core/scanner'
import useHashListener from './core/useHashListener'

/* ===type=== */
interface propsData {
  contentMark: string
  diyWrap: string
  diyItem: string
}

interface catalogueItemData {
  tagType: string
  text: string
  paddingLeft: number
  hash: string
}
/* ===styleValue=== */
const baseWrapSV = `
  width: 200px;
  font-size: 16px;
 
  text-align: start;
`
const baseItemSV = `
  cursor: pointer;
  border-left: solid 2px #eef1ea;
  &:hover {
    color: red
  }
`
/* ===style=== */
// tip
css`
  border-left: solid 2px green;
`

const Catalogue: React.FC<propsData> = (props) => {
  const [catalogueItemList, setCatalogueItemList] = useState<
    catalogueItemData[]
  >([])
  const currentHash = useHashListener()

  useEffect(() => {
    const scanResult = scanner(props.contentMark)
    setCatalogueItemList(scanResult)
  }, [])
  return (
    <>
      {catalogueItemList.length ? (
        <div css={css(baseWrapSV, props.diyWrap)}>
          {catalogueItemList.map((catalogueItem) => {
            return (
              <div
                key={catalogueItem.hash}
                css={css(
                  baseItemSV,
                  {
                    paddingLeft: 10 * catalogueItem.paddingLeft
                  },
                  {
                    borderLeftColor:
                      currentHash === catalogueItem.hash ? 'green' : '#eef1ea'
                  },
                  props.diyItem
                )}
                onClick={() => (location.hash = catalogueItem.hash)}
              >
                {catalogueItem.text}
              </div>
            )
          })}
        </div>
      ) : (
        'loading'
      )}
    </>
  )
}

export default Catalogue
