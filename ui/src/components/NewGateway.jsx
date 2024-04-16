import React, {useState} from 'react'

function NewGateway({ api, setShowNew }) {
  const [newGateway, setNewGateway] = useState({})

  function handleTextContentChange(e) {
      newGateway[e.target.name] = e.target.value
  }

  async function publishPoke() {
    api.poke({
      app: "near-gateways",
      mark: "near-action",
      json: {
        publish: {
          name: newGateway.name,
          url: newGateway.url,
          about: newGateway.about
        }
      },
      onSuccess: () => setNewGateway({}),
      onError: () => setError(`Failed to fetch glob from ${newGateway.url}`)
    })
  }

  return (
    <div className='formContainer'>
      <button className='closeNewBtn' onClick={() => {setShowNew(false)}}>
        x
      </button>
      <p className='paragraph'>
        1. Glob your gateway using -landscape!make-glob.
        <br/>
        2. Upload the glob to your S3 bucket.
        <br/>
        3. Publish your BOS gateway here.
        <br/>
      </p>
      <form onSubmit={publishPoke} className='formStyle'>
        <div className='nameForm'>
          <h3 className='labelStyle'>Title</h3>
          <input
            name="name"
            value={newGateway.name}
            onChange={(e) => handleTextContentChange(e)}
            className='inputStyle'
            required={true}
            maxLength="30"
          />
        </div>
        <div className='urlForm'>
          <h3 className='labelStyle'>Glob URL</h3>
          <input
            name="url"
            value={newGateway.url}
            onChange={(e) => handleTextContentChange(e)}
            className='inputStyle'
            required={true}
          />
        </div>
        <div className='aboutForm'>
          <h3 className='labelStyle'>Description</h3>
          <textarea
            name="about"
            value={newGateway.url}
            onChange={(e) => handleTextContentChange(e)}
            className='inputStyle'
            maxLength="256"
          />
        </div>
        <button type="submit" className='btnStyle'>
          Publish Gateway
        </button>
      </form>
    </div>
  )
}

export default NewGateway
