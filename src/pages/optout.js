import React from 'react'

const Optout = (props) => {
  if (typeof window !== "undefined") {
    const gaProperty = 'UA-115612853-1'
    const disableStr = 'ga-disable-' + gaProperty
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;path=/'
    window[disableStr] = true
  }
  
  return (
    <div>You will no longer be tracked!</div>
  )
}

export default Optout
