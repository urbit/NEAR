import { Widget } from 'near-social-vm'
import React, { useEffect, useMemo, useState } from 'react'
import urbitNear from '../data/urbitNear.json'
//import { useLocation, useParams } from 'react-router-dom'

const SESSION_STORAGE_REDIRECT_MAP_KEY = 'nearSocialVMredirectMap'

function Viewer({ code }) {
  const [tryCode, setTryCode] = useState(null)
  // const { path } = './' //useParams()
  const location = window.location //useLocation()
  const searchParams = new URLSearchParams(location.search)

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value
      return props
    }, {})
  }, [location])

  // const src = useMemo(() => {
  //   const defaultSrc = '/' //"urbit.near/widget/app"; // default widget to load
  //   const pathSrc = path || defaultSrc // if no path, load default widget
  //   return pathSrc
  // }, [path])

  const newCode = useMemo(() => {
    const urbitPlayground =
      urbitNear.components['urbit.near/widget/page.playground']
    const ifCode = code || urbitPlayground.code
    return ifCode
  })

  const [redirectMap, setRedirectMap] = useState(null)

  useEffect(() => {
    const fetchRedirectMap = async () => {
      try {
        const localStorageFlags = JSON.parse(
          localStorage.getItem('flags') || '{}'
        )
        let redirectMapData

        if (localStorageFlags.bosLoaderUrl) {
          const response = await fetch(localStorageFlags.bosLoaderUrl)
          const data = await response.json()
          redirectMapData = data.components
        } else {
          redirectMapData = JSON.parse(
            sessionStorage.getItem(SESSION_STORAGE_REDIRECT_MAP_KEY) || '{}'
          )
        }
        setRedirectMap(redirectMapData)
      } catch (error) {
        console.error('Error fetching redirect map:', error)
      }
    }
    fetchRedirectMap()
    // setTryCode(
    // const Label = styled.span`
    // font-size: 16px;
    // `;
    // return (
    //   <div>
    //     <Label>setTryCode Element</Label>
    //   </div>
    // )
    // )
    console.log('widget', Widget.code)
  }, [])

  return (
    <div>
      <Widget
        code={urbitNear.components['urbit.near/widget/components.Header'].code}
        props={passProps}
        config={{ redirectMap }}
      />
      <Widget
        //src={!code && src}
        code={newCode} // prioritize code
        props={passProps}
        config={{ redirectMap }}
      />
      <Widget
        //src={!code && src}
        code={tryCode} // prioritize code
        props={passProps}
        config={{ redirectMap }}
      />
    </div>
  )
}

export default Viewer
