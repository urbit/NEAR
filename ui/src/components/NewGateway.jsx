import React, { useRef } from 'react';
import { publishGateway, publishThumbnail } from '../api/pokes';
import useUiStore from '../state/uiStore';
import useGatewaysStore from '../state/gatewaysStore';
import html2canvas from 'html2canvas';

function NewGateway() {
  const iframeRef = useRef(null)
  const { setShowNew } = useUiStore()
  const { newGateway, setNewGateway } = useGatewaysStore()

  function handleTextContentChange(e) {
    newGateway[e.target.name] = e.target.value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `${window.location.origin}/apps/near/${newGateway.ship}/${newGateway.id}/gateway/`
    iframeRef.current.src = url

    iframeRef.current.onload = () => {
      html2canvas(iframeRef.current.contentWindow.document.body, {
        imageTimeout: 10000,
        width: 1000,
        height: 1000,
        windowWidth: 1000,
        windowHeight: 1000
      }).then(canvas => {
        canvas.toBlob(blob => {
          publishGateway(newGateway, blob)
          setShowNew(false)
          setNewGateway({})
        }, 'image/jpeg')
      })
    }
  }

  return (
    <div className='form-container'>
      <button className='close-new-btn' onClick={() => {setShowNew(false)}}>
        <span>x</span>
      </button>
      <form className='form-style' onSubmit={handleSubmit}>
        <div className='name-form'>
          <h3 className='labelStyle'>Title</h3>
          <input
            name="name"
            value={newGateway.name}
            onChange={handleTextContentChange}
            className='input-style'
            required={true}
            maxLength="30"
          />
        </div>
        <div className='url-form'>
          <h3 className='labelStyle'>Glob URL</h3>
          <input
            name="url"
            value={newGateway.url}
            onChange={handleTextContentChange}
            className='input-style'
            required={true}
          />
        </div>
        <div className='about-form'>
          <h3 className='labelStyle'>Description</h3>
          <textarea
            name="about"
            value={newGateway.about}
            onChange={handleTextContentChange}
            className='input-style'
            maxLength="256"
          />
        </div>
        <button type="submit" className='btn-style'>
          Publish Gateway
        </button>
        <iframe ref={iframeRef} style={{ display: 'none' }}></iframe>
      </form>
    </div>
  );
}

export default NewGateway;
