import React from 'react'
import TrackVisibility from 'react-on-screen';

class Container extends React.Component {
  render () {
    let className = this.props.isVisible ? 'visible' : ''
    return <div className={className}>{this.props.children}</div>
  }
}

class VisibleDiv extends React.Component {
  render () {
    return (
      <TrackVisibility>
        <Container>
          {this.props.children}
        </Container>
      </TrackVisibility>
    )
  }
}

export default VisibleDiv
