interface movePropsData {
  openMoveHorizontally?: true
  contentMark: string
  catalogueMark: string
}

const moveCallBack = (props: movePropsData) => {
  const contentDOM: HTMLDivElement | null = document.querySelector(props.contentMark)
  const catalogueDOM: HTMLDivElement | null = document.querySelector(props.catalogueMark)

  const left = (contentDOM?.offsetLeft || 0) + (contentDOM?.offsetWidth || 0)

  if (catalogueDOM?.style) {
    catalogueDOM.style.left = left + 20 + 'px'
  }
}

function moveHorizontally(props: movePropsData) {
  if (props.openMoveHorizontally) {
    moveCallBack(props)
    window.addEventListener('resize', moveCallBack.bind(null, props))
  }
  return 1
}

export default moveHorizontally
