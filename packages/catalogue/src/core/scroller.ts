import React from 'react'
import { debounce } from '@/utils/debounce'
import { exportedDomNeeded } from './clickingTheCatalogueItemCausesThePageToScroll'

function findWhichDomMarginTopCloser(
  params: [HTMLAnchorElement[], React.Dispatch<React.SetStateAction<string>>]
) {
  const closerDom = params[0].sort((a, b) => {
    return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top)
  })[0]
  const currentAnchor = closerDom.getAttribute('data-anchor') || ''
  location.hash = currentAnchor
  params[1](currentAnchor)
}

const findWhichDomMarginTopCloserDebounced = debounce(
  findWhichDomMarginTopCloser as () => unknown,
  200
)

const DE = document.documentElement

function scroller(
  scannedDoms: unknown,
  setCurrentAnchor: React.Dispatch<React.SetStateAction<string>>
) {
  window.addEventListener('scroll', () => {
    const flag$1 = Math.abs(exportedDomNeeded?.getBoundingClientRect().top || 0) < 1
    const flag$2 = Math.abs(DE.scrollHeight - (DE.scrollTop + DE.clientHeight)) < 1

    if (window.clickHadLetScrollTopChange) {
      if (flag$1 || flag$2) {
        window.clickHadLetScrollTopChange = false
      }
      return
    }

    if (!flag$2) {
      findWhichDomMarginTopCloserDebounced(scannedDoms, setCurrentAnchor)
    }
  })
}

export default scroller
