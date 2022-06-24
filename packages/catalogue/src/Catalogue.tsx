/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import scanner from './core/scanner'
import scroller from './core/scroller'
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
  position: fixed;
  top: 20px;
  right: 20px;
`
const baseItemSV = `
  cursor: pointer;
  border-left: solid 2px #eef1ea;
  transition: all 0.2s;
  &:hover {
    color: red
  }
`
/* ===style=== */
// tip
css`
  border-left: solid 2px green;
  position: fixed;
  top: 20px;
  right: 20px;
  transition: all 1s;
`

const Catalogue: React.FC<propsData> = (props) => {
  const firstRenderHashRef = useRef<string>('')
  const [catalogueItemList, setCatalogueItemList] = useState<
    catalogueItemData[]
  >([])
  const currentHash = useHashListener()

  useLayoutEffect(() => {
    window.clickHadLetHashChange = true
    firstRenderHashRef.current = location.hash
    location.hash = ''
  }, [])

  useEffect(() => {
    const scanResult = scanner(props.contentMark)
    scroller(scanResult.scannedDoms)
    setCatalogueItemList(scanResult.result)
    location.hash = firstRenderHashRef.current
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
                      decodeURIComponent(currentHash || location.hash) ===
                      catalogueItem.hash
                        ? '#0eda29'
                        : '#eef1ea'
                  },
                  props.diyItem
                )}
                onClick={() => {
                  if (
                    decodeURIComponent(location.hash) === catalogueItem.hash
                  ) {
                    window.clickHadLetHashChange = false
                  } else {
                    window.clickHadLetHashChange = true
                  }
                  location.hash = catalogueItem.hash
                }}
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
