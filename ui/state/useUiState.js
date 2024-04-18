import { useState } from 'react'

function useUiState() {
  const [showNew, setShowNew] = useState(false)
  const [subEvent, setSubEvent] = useState({})
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const [installWindow, setInstallWindow] = useState(false)

  return {
    showNew,
    setShowNew,
    subEvent,
    setSubEvent,
    loading,
    setLoading,
    showDelete,
    setShowDelete,
    installWindow,
    setInstallWindow
  }
}

export default useUiState
