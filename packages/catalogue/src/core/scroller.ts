import { debounce } from '../utils/debounce'

function findWhichDomMarginTopCloser(params: HTMLAnchorElement[][]) {
  const closerDom = params[0].sort((a, b) => {
    return (
      Math.abs(a.getBoundingClientRect().top) -
      Math.abs(b.getBoundingClientRect().top)
    )
  })

  location.hash = closerDom[0].id
}

const findWhichDomMarginTopCloserDebounced = debounce(
  findWhichDomMarginTopCloser as () => unknown,
  200
)

function scroller(scannedDoms: unknown) {
  window.addEventListener('scroll', () => {
    if (window.clickHadLetHashChange) return
    findWhichDomMarginTopCloserDebounced(scannedDoms)
  })
}

export default scroller
