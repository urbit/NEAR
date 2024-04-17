import React, { useState } from 'react'
import { installGateway } from '../api/pokes'

function InstallGatewayModal({ gateway }) {
  return (
    <div className="deleteGateway">
      <h2 className='paragraph'>
        BOS gateways can access all data on your ship, just like any other Urbit app. Only install gateways from developers you trust!
      </h2>
      <h2 className='paragraph-2'>
        Would you like to install {gateway.name}?
      </h2>
      <div className="instButtons">
        <button onClick={async () => {installGateway(gateway)}}>
          Install
        </button>
        {/* setInstGateway({}) */}
        <button onClick={() => { setInstallWindow(false) }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default InstallGatewayModal
