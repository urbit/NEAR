import { Widget } from 'near-social-vm'
import React, { useEffect, useMemo, useState } from 'react'
//import { useLocation, useParams } from 'react-router-dom'
//import { urbitPlayground } from '../../../apps/urbit/widget/page/playground.jsx'

const SESSION_STORAGE_REDIRECT_MAP_KEY = 'nearSocialVMredirectMap'

function Viewer({ code }) {
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
    const urbitCode =
      'const GlowLight = styled.span`\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n  background-color: ${(props) => (props.isConnected ? "green" : "red")};\n  box-shadow: 0 0 8px ${(props) => (props.isConnected ? "green" : "red")};\n`;\n\nconst Label = styled.span`\n  font-size: 16px;\n`;\n\nconst StatusIndicator = ({ isConnected, label }) => {\n  return (\n    <div className="d-flex align-items-center">\n      <GlowLight isConnected={isConnected} />\n      <Label>{label}</Label>\n    </div>\n  );\n};\n\nconst Container = styled.div`\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  margin: 20px;\n`;\n\nconst Section = styled.div`\n  display: flex;\n  justify-content: space-between;\n  background-color: #f5f5f5; /* Light grey background */\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n`;\n\nconst SectionTitle = styled.h2`\n  font-size: 20px;\n  margin-bottom: 10px;\n`;\n\nconst TextArea = styled.textarea`\n  width: 100%;\n  height: 200px;\n  border: 1px solid #ccc; /* Faint grey border */\n  border-radius: 10px;\n  padding: 10px;\n  box-sizing: border-box;\n  font-family: inherit;\n  resize: none; /* Optional: Disables resizing */\n`;\n\nconst Button = styled.button``;\nconst [response, setResponse] = useState("");\nconsole.log(Urbit)\n\nreturn (\n  <Container>\n    <Section as="div" style={{ flexDirection: "column" }}>\n      <Button\n        onClick={() => {\n          Urbit.pokeUrbit(\'near-handler\', \'near-handler-action\', {\n            // hard-coded dummy pubkey\n            \'add\': \'0x11d9.2405.6c6f.f37a.675a.b2f4.0c99.8cfb.ea8b.f032.c83e.79a6.5305.72eb.0e9f.08c0\'\n          }).then((res) => {\n            console.log(Urbit)\n            setResponse(res);\n          });\n        }}\n      >\n        pokeUrbit\n      </Button>\n      <Button\n        onClick={() => {\n          Urbit.pokeNearHandler({\n            \'del\': \'0x11d9.2405.6c6f.f37a.675a.b2f4.0c99.8cfb.ea8b.f032.c83e.79a6.5305.72eb.0e9f.08c0\'\n          })\n        }}\n      >\n        pokeNearHandler\n      </Button>\n      <Button\n        onClick={() => {\n          Urbit.scryNearHandler("/accs")\n          .then((res) => {\n            setResponse(res);\n          });\n        }}\n      >\n        scryNearHandler /accs\n      </Button>\n    </Section>\n    <Section as="div" style={{ flexDirection: "column" }}>\n      <SectionTitle>Console</SectionTitle>\n      <TextArea\n        placeholder="Output from testing will appear here..."\n        value={response}\n        disabled\n      />\n    </Section>\n  </Container>\n);\n'
    //'const { page, tab, ...passProps } = props;\n\nconst routes = {\n  // Add new routes below\n  home: {\n    path: "urbit.near/widget/page.home", // notice how this coincides with apps/urbit/widget/page/home.js\n    blockHeight: "final",\n    init: {\n      name: "Home",\n    },\n  },\n  playground: {\n    path: "urbit.near/widget/page.playground",\n    blockHeight: "final",\n    init: {\n      name: "Playground",\n    },\n  },\n};\n\nconst { AppLayout } = VM.require("urbit.near/widget/template.AppLayout") || {\n  AppLayout: () => <></>\n};\n\nif (!page) page = Object.keys(routes)[0] || "home";\n\nconst Root = styled.div``;\n\nfunction Router({ active, routes }) {\n  const routeParts = active.split(".");\n\n  let currentRoute = routes;\n  let src = "";\n  let defaultProps = {};\n\n  for (let part of routeParts) {\n    if (currentRoute[part]) {\n      currentRoute = currentRoute[part];\n      src = currentRoute.path;\n\n      if (currentRoute.init) {\n        defaultProps = { ...defaultProps, ...currentRoute.init };\n      }\n    } else {\n      // Handle 404 or default case for unknown routes\n      return <p>404 Not Found</p>;\n    }\n  }\n\n  return (\n    <div key={active}>\n      <Widget\n        src={src}\n        props={{\n          currentPath: `/urbit.near/widget/app?page=${page}`,\n          page: tab,\n          ...passProps,\n          ...defaultProps,\n        }}\n      />\n    </div>\n  );\n}\n\nconst Container = styled.div`\n  display: flex;\n  height: 100%;\n`;\n\nconst Content = styled.div`\n  width: 100%;\n  height: 100%;\n`;\n\nreturn (\n  <Root>\n    <Container>\n      <AppLayout page={page} routes={routes} {...props}>\n        <Content>\n          <Router active={page} routes={routes} />\n        </Content>\n      </AppLayout>\n    </Container>\n  </Root>\n);\n'
    //'const GlowLight = styled.span`\n  height: 20px;\n  width: 20px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 10px;\n  background-color: ${(props) => (props.isConnected ? "green" : "red")};\n  box-shadow: 0 0 8px ${(props) => (props.isConnected ? "green" : "red")};\n`;\n\nconst Label = styled.span`\n  font-size: 16px;\n`;\n\nconst StatusIndicator = ({ isConnected, label }) => {\n  return (\n    <div className="d-flex align-items-center">\n      <GlowLight isConnected={isConnected} />\n      <Label>{label}</Label>\n    </div>\n  );\n};\n\nconst Container = styled.div`\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  margin: 20px;\n`;\n\nconst Section = styled.div`\n  display: flex;\n  justify-content: space-between;\n  background-color: #f5f5f5; /* Light grey background */\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n`;\n\nconst SectionTitle = styled.h2`\n  font-size: 20px;\n  margin-bottom: 10px;\n`;\n\nreturn (\n  <Container>\n    <Section>\n      <div>\n        <SectionTitle>Configuration</SectionTitle>\n        <StatusIndicator isConnected={Urbit} label={"VM Configured"} />\n      </div>\n    </Section>\n  </Container>\n);\n'
    const ifCode = code || urbitCode
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
  }, [])

  return (
    <Widget
      //src={!code && src}
      code={newCode} // prioritize code
      props={passProps}
      config={{ redirectMap }}
    />
  )
}

export default Viewer
