import React from 'react'

function getImage(url) {
  // TODO get image and fallback if bad response
  return url
}

function GatewayCard({ id, imageUrl, title, author, description, link, isPublished, isInstalled }) {
  function handleInstallClick() {
    // return (
    //   <InstallGatewayModal
    //     gateway={{
    //       id: id,
    //       name: title,
    //       ship: author,
    //       url: link,
    //       about: description
    //     }}
    //   />
    // )
  }

  function handleOpenClick() {
    window.open(`${link}`, '_blank', 'noopener,noreferrer')
  }

  function handleDeleteClick() {

  }

  function handleUnpublishClick() {

  }

  return (
    <div>
      <img src={getImage(imageUrl)} alt={`${title} preview image`} />
      <div className='info'>
        <h2 className='title'>{title}</h2>
        <h3 className='ship'>{author}</h3>
        <h4 className='text'>{description}</h4>
      </div>
      <button onClick={() => isPublished ? handleUnpublishClick : handleDeleteClick}>
        {isPublished ? 'Unpublish' : 'Delete'}
      </button>
      <button onClick={() => isInstalled ? handleOpenClick : handleInstallClick}>
        {isInstalled ? 'Open' : 'Install'}
      </button>
    </div>
  )
}

export default GatewayCard
