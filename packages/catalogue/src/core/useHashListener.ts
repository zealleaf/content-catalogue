import { useEffect, useState } from 'react'

function useHashListener() {
  const [currentHash, setCurrentHash] = useState('')

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setCurrentHash(location.hash)
    })
  }, [])

  return currentHash
}

export default useHashListener
