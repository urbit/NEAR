import React, {useState} from 'react'
import { publishGateway } from '../api/pokes'

function NewGateway({ setShowNew, setError }) {
  const [newGateway, setNewGateway] = useState({})

  function handleTextContentChange(e) {
      newGateway[e.target.name] = e.target.value
  }

  return (
    <div className='form-container'>
      <button className='close-new-btn' onClick={() => {setShowNew(false)}}>
        <span>x</span>
      </button>
      <p className='paragraph'>
        1. Glob your gateway using -landscape!make-glob.
        <br/>
        2. Upload the glob to your S3 bucket.
        <br/>
        3. Publish your BOS gateway here.
        <br/>
      </p>
      <form onSubmit={async () => {publishGateway(newGateway, setNewGateway, setError)}} className='form-style'>
        <div className='name-form'>
          <h3 className='labelStyle'>Title</h3>
          <input
            name="name"
            value={newGateway.name}
            onChange={(e) => handleTextContentChange(e)}
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
            onChange={(e) => handleTextContentChange(e)}
            className='input-style'
            required={true}
          />
        </div>
        <div className='about-form'>
          <h3 className='labelStyle'>Description</h3>
          <textarea
            name="about"
            value={newGateway.url}
            onChange={(e) => handleTextContentChange(e)}
            className='input-style'
            maxLength="256"
          />
        </div>
        <button type="submit" className='btn-style'>
          Publish Gateway
        </button>
      </form>
    </div>
  )
}

export default NewGateway
