import React from 'react'
import lus from '../assets/lus.svg'
import useUiStore from '../state/uiStore';
import useGatewaysStore from '../state/gatewaysStore';

function UploadCard() {
  const { setDelGateway } = useGatewaysStore()
  const { setShowNew, setShowDelete } = useUiStore()

  const handleClick = () => {
    setShowNew(true);
    setDelGateway({});
    setShowDelete(false);
  };

  return (
    <>
      <div
        className='gateway-container'
        onClick={handleClick}
        style={{
          backgroundColor: '#141915',
          border: '0.5px solid #ABE68D',
          cursor: 'pointer'
        }}
      >
        <div className="image-container">
          <img
            src={lus}
            alt='upload card image'
            className='gateway-image'
          />
        </div>
        <div className='info'>
          <h2 className='title' style={{ color: '#ABE68D'}}>Upload your gateway</h2>
          <h4 className='text' style={{ color: '#ABE68D'}}>Once uploaded, people can install your BOS gateway on their ship to run locally.</h4>
        </div>
      </div>
    </>
  )
}

export default UploadCard
