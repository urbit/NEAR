import React from 'react'
import fallbackImage from '../assets/fallback.svg'

function UploadingCard({ gateway }) {
  return (
    <>
      <div
        className='gateway-container'
        style={{
          backgroundColor: '#141915',
          border: '0.5px solid #ABE68D',
          cursor: 'pointer'
        }}
      >
        <div
          className="image-container"
          style={{
            border: 'none',
            borderBottom: '0.5px solid #ABE68D',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#ABE68D',
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          />
          <img
            src={gateway.thumbnail ? gateway.thumbnail : fallbackImage}
            alt={`${gateway.name} preview image`}
            className="gateway-image"
            style={{ display: 'block', width: '100%' }}
          />
        </div>
        <div className='info'>
          <h2 className='title' style={{ color: '#ABE68D'}}>{gateway.name}</h2>
          <h3 className='ship' style={{ color: '#ABE68D'}}>{`~${window.ship}`}</h3>
          <h4 className='text' style={{ color: '#ABE68D'}}>Loading...</h4>
        </div>
      </div>
    </>
  )
}

export default UploadingCard
