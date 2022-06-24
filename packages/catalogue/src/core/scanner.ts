const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// scanner
// Scan page content for directory data
function scanner(contentMark: string) {
  let result = []

  // step1
  for (const tag of tags) {
    const selector = contentMark + ' ' + tag
    const selectedDomList$1 = [...document.querySelectorAll(selector)]
    selectedDomList$1.forEach((dom) => {
      dom.setAttribute('data-selected', 'true')
    })
  }

  // step2
  const selectedDomList$2 = [
    ...document.querySelectorAll("[data-selected='true']")
  ]

  // step3
  const map = new Map()
  let letHashPayloadIndex = false
  selectedDomList$2.forEach((item) => {
    if (map.has(item.innerHTML)) {
      letHashPayloadIndex = true
      return
    } else {
      map.set(item.innerHTML, 1)
    }
  })

  // step4
  result = selectedDomList$2.map((selectedDom, index) => {
    if (letHashPayloadIndex) {
      selectedDom.id = selectedDom.innerHTML + '-' + index
    } else {
      selectedDom.id = selectedDom.innerHTML
    }
    return {
      hash: '#' + selectedDom.id,
      paddingLeft: Number(selectedDom.tagName.replace('H', '')),
      tagType: selectedDom.tagName,
      text: selectedDom.innerHTML
    }
  })

  return { result, scannedDoms: selectedDomList$2 } || []
}

export default scanner
