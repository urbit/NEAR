import React from 'react';
import { publishGateway } from '../api/pokes';
import useUiStore from '../state/uiStore';
import useGatewaysStore from '../state/gatewaysStore';

function NewGateway() {
  const { setShowNew } = useUiStore()
  const { newGateway, setNewGateway, addToUploading } = useGatewaysStore()

  function handleTextContentChange(e) {
    newGateway[e.target.name] = e.target.value
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    publishGateway(newGateway)
    addToUploading(newGateway)
    setShowNew(false)
    setNewGateway({})
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
        <br />
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
        <br />
        <div className='url-form'>
          <h3 className='labelStyle'>Thumbnail URL</h3>
          <input
            name="thumbnail"
            value={newGateway.thumbnail}
            onChange={handleTextContentChange}
            className='input-style'
            required={false}
          />
        </div>
        <br />
        <div className='about-form'>
          <h3 className='labelStyle'>Description</h3>
          <textarea
            name="about"
            value={newGateway.about}
            onChange={handleTextContentChange}
            className='input-style'
            maxLength="256"
            required={true}
          />
        </div>
        <div className="button-container">
          <button type="submit" className='btn-style publish-gateway'>
            Publish Gateway
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewGateway;
