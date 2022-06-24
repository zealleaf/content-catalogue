import { useEffect, useState } from 'react'

function useHashListener() {
  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setCurrentHash(location.hash)
      setTimeout(() => {
        window.clickHadLetHashChange = false
      }, 200)
    })
  }, [])

  return currentHash
}

export default useHashListener
