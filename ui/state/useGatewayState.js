import { useState } from 'react'

function useGatewaysState() {
  const [heard, setHeard] = useState([])
  const [published, setPublished] = useState([])
  const [installed, setInstalled] = useState([])
  const [delGateway, setDelGateway] = useState({})
  const [newGateway, setNewGateway] = useState({})
  const [instGateway, setInstGateway] = useState({})
  const [newGateways, setNewGateways] = useState([])
  const [installedGateways, setInstalledGateways] = useState([])

  return {
    heard,
    setHeard,
    published,
    setPublished,
    installed,
    setInstalled,
    delGateway,
    setDelGateway,
    newGateway,
    setNewGateway,
    instGateway,
    setInstGateway,
    newGateways,
    setNewGateways,
    installedGateways,
    setInstalledGateways
  }
}

export default useGatewaysState
