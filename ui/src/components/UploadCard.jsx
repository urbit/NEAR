import React from 'react'
import lus from '../assets/lus.png'
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
      <div className='gateway-container' onClick={handleClick}>
        <img
          src={lus}
          alt='upload card image'
        />
        <div className='info'>
          <h2 className='title'>Upload your gateway</h2>
          <h4 className='text'>Once uploaded, people can install your BOS gateway on their ship to run locally.</h4>
        </div>
      </div>
    </>
  )
}

export default UploadCard
