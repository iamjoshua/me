import React from 'react'
import { Transition } from 'react-transition-group'

const duration = 300
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: {
    opacity: 0,
    marginTop: 50,
   },
  entered:  {
    opacity: 1,
    marginTop: 0
  },
  exiting:  {
    opacity: 1,
    marginTop: 0,
  },
  exited:  {
    opacity: 0,
    marginTop: 50
  },
}

const timeout={
 appear: 500,
 enter: 300,
 exit: 300,
}

const Fade = ({ in: inProp, children }) => (
  <Transition in={true} out={true} appear={true} timeout={0}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {children}
      </div>
    )}
  </Transition>
)

export default Fade
