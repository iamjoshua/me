import React from "react"
import { Share } from 'react-twitter-widgets'
import styles from './subscribe.module.scss'

const Subscribe = (props) => {
  let subscribed = false
  if (window.location.search === '?subscribed' || document.cookie.match('subscribed')) {
    document.cookie = "subscribed=true"
    subscribed = true
  }

  return (
    <div className={styles.container}>
      <div className={styles.share}>
        <strong>Share</strong>
        <p>Don't regret reading this? Should other people not regret reading this too?</p>
        <div className={styles.twitter} >
          <Share url={props.url} />
        </div>
      </div>
        {subscribed &&
          <div className={styles.subscribe}>
            <strong>You're Subscribed!</strong>
              <p>
                I promise not to (intentionally) let you down...
              </p>
          </div>
        }
        {!subscribed &&
        <div className={styles.subscribe}>
            <strong>Subscribe</strong>
            <p>
              <i>The wait is over!</i> Get notified by email the minute this guy you've never heard of <i>"publishes"</i> words to the internet.
            </p>
            <form name="subscribe" data-netlify-honeypot="bot-field" method="POST" action="?subscribed" data-netlify="true">
              <p className={styles.hidden}>
                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
              </p>
              <p>
                <input type="text" placeholder="you@somewhere.com" name="email"/>
                <button type="submit">Subscribe</button>
              </p>
            </form>
        </div>
      }
    </div>
  )
}

export default Subscribe
