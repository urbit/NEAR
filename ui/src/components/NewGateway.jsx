import React, {useState} from 'react'

function NewGateway(api) {
const [newGateway, setNewGateway]= useState({})

    function handleChange(e) {
        newGateway[e.target.name] = e.target.value
    }

    async function publishPoke(e) {
        api.poke({
            app: "near-gateways",
            mark: "near-action",
            json: {"publish": {"name":newGateway.name, 'url':newGateway.url}},
            onSuccess: () => setNewGateway({}),
            onError: () => setError('Failed to fetch glob from ' + newGateway.url),
          });
    }

const formContainer = "mt-4 p-4 font-medium w-8/10"
const inputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5"
const labelStyle = "pt-4 font-medium"
const btnStyle = "text-white bg-gray-400 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto px-5 py-2.5 text-center m-4"
const paragraph = "mt-3 mb-3"
const formStyle = "grid align-center w-9/12"
    return(
        <div className={formContainer}>
            <p className={paragraph}>
                1. Glob gateway using -landscape!make-glob.
            <br/>
                2. Upload it to your s3 bucket.
            <br/>
                3. Publish gateway through form below.
            <br/>
            ------
            <br/><br/>
            If your gateway is ReactApp before globbing in dist/index.html, change all href of scripts and links from apps/desk/assest/... to ./assets/...
            </p>
            <form onSubmit={publishPoke} className={formStyle}>
                <label className={labelStyle}>name</label>
                <input name="name" value={newGateway.name} onChange={(e) => handleChange(e)} className={inputStyle} required="true" />
                <label className={labelStyle}>glob url</label>
                <input name="url" value={newGateway.url} onChange={(e) => handleChange(e)} className={inputStyle} required="true" />
                <button type="submit" className={btnStyle}>publish gateway</button>
            </form>
        </div>
    )
}
export default NewGateway