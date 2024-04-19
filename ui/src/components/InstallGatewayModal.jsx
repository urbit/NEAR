import React from 'react'
import { installGateway } from '../api/pokes'
import useUiStore from '../../state/uiStore'
import useGatewaysStore from '../../state/gatewaysStore'

function InstallGatewayModal() {
  const { setInstallWindow } = useUiStore()
  const { instGateway, setInstGateway } = useGatewaysStore()

  return (
    <div className="delete-gateway">
      <h2 className='paragraph'>
        BOS gateways can access all data on your ship, just like any other Urbit app. Only install gateways from developers you trust!
      </h2>
      <h2 className='paragraph-2'>
        Would you like to install {instGateway.name}?
      </h2>
      <div className="inst-buttons">
        <button onClick={async () => {installGateway(instGateway)}}>
          Install
        </button>
        <button onClick={() => {
          setInstGateway({})
          setInstallWindow(false)
        }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default InstallGatewayModal
