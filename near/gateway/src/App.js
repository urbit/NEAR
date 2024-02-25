import { setupWalletSelector } from '@near-wallet-selector/core'
//import { setupHereWallet } from '@near-wallet-selector/here-wallet'
//import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet'
import { setupModal } from '@near-wallet-selector/modal-ui'
import '@near-wallet-selector/modal-ui/styles.css'
//import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet'
//import { setupNearWallet } from '@near-wallet-selector/near-wallet'
import { setupNeth } from '@near-wallet-selector/neth'
//import { setupSender } from '@near-wallet-selector/sender'
import 'App.scss'
import Big from 'big.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { isValidAttribute } from 'dompurify'
import 'error-polyfill'
import { useAccount, useInitNear, useNear, utils } from 'near-social-vm'
import React, { useCallback, useEffect, useState } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'
//import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { BosLoaderBanner } from './components/BosLoaderBanner'
import Core from './components/Core'
import { NetworkId, Widgets } from './data/widgets'
import { useBosLoaderInitializer } from './hooks/useBosLoaderInitializer'
import Flags from './pages/Flags'
import Viewer from './pages/Viewer'

export const refreshAllowanceObj = {}
const documentationHref = 'https://social.near-docs.io/'
export const refreshAllowanceObj = {}
const documentationHref = 'https://social.near-docs.io/'

function App(props) {
  const [connected, setConnected] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [signedAccountId, setSignedAccountId] = useState(null)
  const [availableStorage, setAvailableStorage] = useState(null)
  const [walletModal, setWalletModal] = useState(null)
  const [widgetSrc, setWidgetSrc] = useState(null)
  const [connected, setConnected] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const [signedAccountId, setSignedAccountId] = useState(null)
  const [availableStorage, setAvailableStorage] = useState(null)
  const [walletModal, setWalletModal] = useState(null)
  const [widgetSrc, setWidgetSrc] = useState(null)

  useBosLoaderInitializer()
  useBosLoaderInitializer()

  const { initNear } = useInitNear()
  const near = useNear()
  const account = useAccount()
  const accountId = account.accountId
  const { initNear } = useInitNear()
  const near = useNear()
  const account = useAccount()
  const accountId = account.accountId

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            //setupNearWallet(),
            //setupMyNearWallet(),
            //setupSender(),
            //setupHereWallet(),
            //setupMeteorWallet(),
            setupNeth({
              gas: '300000000000000',
              bundle: false
            })
          ]
              gas: '300000000000000',
              bundle: false
            })
          ]
        }),
        customElements: {
          Link: (props) => {
            if (!props.to && props.href) {
              props.to = props.href
              delete props.href
              props.to = props.href
              delete props.href
            }
            if (props.to) {
              props.to =
                typeof props.to === 'string' &&
                isValidAttribute('a', 'href', props.to)
                typeof props.to === 'string' &&
                isValidAttribute('a', 'href', props.to)
                  ? props.to
                  : 'about:blank'
                  : 'about:blank'
            }
            return (
              <div>
                <a src={props.to}></a>
              </div>
            ) //<Link {...props} />
          }
        },
        config: {
          defaultFinality: undefined
        }
      })
  }, [initNear])
          defaultFinality: undefined
        }
      })
  }, [initNear])

  useEffect(() => {
    if (!near) {
      return
      return
    }
    near.selector.then((selector) => {
      setWalletModal(
        setupModal(selector, { contractId: near.config.contractName })
      )
    })
  }, [near])
      )
    })
  }, [near])

  const requestSignIn = useCallback(
    (e) => {
      e && e.preventDefault()
      walletModal.show()
      return false
      e && e.preventDefault()
      walletModal.show()
      return false
    },
    [walletModal]
  )
  )

  const logOut = useCallback(async () => {
    if (!near) {
      return
      return
    }
    const wallet = await (await near.selector).wallet()
    wallet.signOut()
    near.accountId = null
    setSignedIn(false)
    setSignedAccountId(null)
  }, [near])
    const wallet = await (await near.selector).wallet()
    wallet.signOut()
    near.accountId = null
    setSignedIn(false)
    setSignedAccountId(null)
  }, [near])

  const refreshAllowance = useCallback(async () => {
    alert(
      "You're out of access key allowance. Need sign in again to refresh it"
    )
    await logOut()
    requestSignIn()
  }, [logOut, requestSignIn])
  refreshAllowanceObj.refreshAllowance = refreshAllowance
    )
    await logOut()
    requestSignIn()
  }, [logOut, requestSignIn])
  refreshAllowanceObj.refreshAllowance = refreshAllowance

  useEffect(() => {
    if (!near) {
      return
      return
    }
    setSignedIn(!!accountId)
    setSignedAccountId(accountId)
    setConnected(true)
  }, [near, accountId])
    setSignedIn(!!accountId)
    setSignedAccountId(accountId)
    setConnected(true)
  }, [near, accountId])

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance
        ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
        : Big(0)
    )
  }, [account])
    )
  }, [account])

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    setWidgetSrc,
    signedAccountId,
    signedIn,
    connected,
    availableStorage,
    widgetSrc,
    logOut,
    requestSignIn,
    widgets: Widgets,
    documentationHref
  }
    documentationHref
  }

  return (
    <div>
      <BosLoaderBanner />
      <Flags {...passProps} />
    </div>
    // <Router basename={process.env.PUBLIC_URL}>
    //   <Switch>
    //     <Route path={'/'}>
    //       <BosLoaderBanner />
    //       <Flags {...passProps} />
    //     </Route>
    //     {/* <Route path={'/:path*'}>
    //       <BosLoaderBanner />
    //       <Viewer {...passProps} />
    //       <Core {...passProps} />
    //     </Route> */}
    //   </Switch>
    // </Router>
  )
}

export default App
export default App
