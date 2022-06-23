const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// scanner
// Scan page content for directory data
function scanner(contentMark: string) {
  let scanResult = []

  // step1
  for (const tag of tags) {
    const selector = contentMark + ' ' + tag
    const selectedDomList$1 = [...document.querySelectorAll(selector)]
    selectedDomList$1.forEach((dom) => {
      dom.id = dom.tagName + dom.innerHTML
      dom.setAttribute('selected', 'true')
    })
  }

  // step2
  const selectedDomList$2 = [...document.querySelectorAll("[selected='true']")]

  // step3
  scanResult = selectedDomList$2.map((selectedDom) => {
    return {
      hash: '#' + selectedDom.tagName + selectedDom.id,
      paddingLeft: Number(selectedDom.tagName.replace('H', '')),
      tagType: selectedDom.tagName,
      text: selectedDom.innerHTML
    }
  })

  return scanResult || []
}

export default scanner
