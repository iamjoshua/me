import React from 'react'
import Helmet from 'react-helmet'
import styles from './thought.module.scss'

class Thought extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      offset: '40%',
      height: window.innerHeight - 100,
    }
    this._reposition = this.reposition.bind(this)
  }
  componentDidMount () {
    document.addEventListener('scroll', this._reposition)
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this._reposition)
  }
  reposition () {
    let offset = window.pageYOffset / 4
    offset = offset > 100 ? 100 : offset
    this.setState({
      offset: `calc(40% - ${offset}px)`,
    })
  }
  render () {
    return (
      <div className={styles.container}>
        <Helmet
          title={this.props.axiom}
          meta={[
            { name: 'description', content: this.props.axiom },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <div className={styles.post}>
          <div className={styles.axiom}>
            <div className={styles.inner} style={{top: this.state.offset}}>
              <div>It seems to me that:</div>
              <h1 contentEditable={this.props.editable} dangerouslySetInnerHTML={{ __html: this.props.axiom }} />
              <div className={styles.bar}></div>
            </div>
          </div>

          <div className={styles.content} style={{minHeight: this.state.height}}>
            <div className={styles.inner}>
              <div contentEditable={this.props.editable} dangerouslySetInnerHTML={{ __html: this.props.html }} />
              <div className={styles.source}><a href={this.props.sourceLink}>Versions</a></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Thought
