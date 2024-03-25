import React, {useState} from 'react'

function NewGateway(props) {
    const [newGateway, setNewGateway]= useState({})
    const api = props.api
    const setShowNew = props.setShowNew
    function handleChange(e) {
        newGateway[e.target.name] = e.target.value
    }

    async function publishPoke(e) {
        api.poke({
            app: "near-gateways",
            mark: "near-action",
            json: {"publish": {"name":newGateway.name, "url":newGateway.url, "about":newGateway.about}},
            onSuccess: () => setNewGateway({}),
            onError: () => setError('Failed to fetch glob from ' + newGateway.url),
          });
    }

    
    return(
        <div className='formContainer'>
            <button className='closeNewBtn' onClick={()=>{setShowNew(false)}}>x</button>
            <p className='paragraph'>
                1. Glob gateway using -landscape!make-glob.
            <br/>
                2. Upload it to your s3 bucket.
            <br/>
                3. Publish gateway through form below.
            <br/>
            </p>
            <form onSubmit={publishPoke} className='formStyle'>
                <div className='nameForm'>
                <h3 className='labelStyle'>name</h3>
                <input name="name" value={newGateway.name} onChange={(e) => handleChange(e)} className='inputStyle' required="true" />
                </div>
                <div className='urlForm'>
                <h3 className='labelStyle'>glob url</h3>
                <input name="url" value={newGateway.url} onChange={(e) => handleChange(e)} className='inputStyle' required="true" />
                </div>
                <div className='aboutForm'>
                <h3 className='labelStyle'>about</h3>
                <textarea name="about" value={newGateway.url} onChange={(e) => handleChange(e)} className='inputStyle' maxlength="250" ></textarea>
                </div>
                <button type="submit" className='btnStyle'>publish gateway</button>
            </form>
        </div>
    )
}
export default NewGateway