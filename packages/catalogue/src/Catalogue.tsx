/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import clickingTheCatalogueItemCausesThePageToScroll from '@/core/clickingTheCatalogueItemCausesThePageToScroll'
import scanner, { scannerReturn } from '@/core/scanner'
import scroller from '@/core/scroller'
import { debounce } from '@/utils/debounce'

/* ===type=== */
interface propsData {
  contentMark: string
  scrollBehavior?: 'smooth' | 'none'
  diyWrap?: string
  diyItem?: string
}

interface catalogueItemData {
  tagType: string
  text: string
  paddingLeft: number
  anchor: string
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
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
  const [catalogueItemList, setCatalogueItemList] = useState<catalogueItemData[]>([])
  const [currentAnchor, setCurrentAnchor] = useState<string>('')
  const scanResultRef = useRef<scannerReturn>()

  const clickFN = ([anchor]: string[]) => {
    window.clickHadLetScrollTopChange = true
    setCurrentAnchor(anchor)
    location.hash = anchor
    clickingTheCatalogueItemCausesThePageToScroll(anchor, scanResultRef.current?.scannedDoms)
  }

  useEffect(() => {
    const scanResult = scanner(props.contentMark)
    scroller(scanResult.scannedDoms, setCurrentAnchor)
    setCatalogueItemList(scanResult.result)
    scanResultRef.current = scanResult
    document.documentElement.style.scrollBehavior = props.scrollBehavior || 'smooth'
    clickFN([decodeURIComponent(location.hash)])
  }, [])

  return (
    <>
      {catalogueItemList.length ? (
        <div css={css(baseWrapSV, props.diyWrap)} id="leafvein-catalogue-wrap">
          {catalogueItemList.map((catalogueItem) => {
            return (
              <div
                className="leafvein-catalogue-item"
                key={catalogueItem.anchor}
                css={css(
                  baseItemSV,
                  {
                    paddingLeft: 10 * catalogueItem.paddingLeft
                  },
                  {
                    borderLeftColor: currentAnchor === catalogueItem.anchor ? '#0eda29' : '#eef1ea'
                  },
                  props.diyItem
                )}
                onClick={() => debounce(clickFN, 100)(catalogueItem.anchor)}
                title={catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
              >
                {catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
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
