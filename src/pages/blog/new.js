import React from 'react'
import {navigateTo} from 'gatsby-link'
import Post from '../../components/blog/post'

class NewBlogPage extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window === "undefined") {
      this.post = this.defaultPost()
    } else {
      this.id = props.location.search.substring(4)
      if (!this.id) this.initPost(props)
      this.post = JSON.parse(localStorage.getItem(this.id))
    }
  }
  defaultPost () {
    return {
      title: 'Title...',
      date: '2018-03-12',
      html: 'Body...'
    }
  }
  initPost () {
    this.id = this.props.post ? this.props.location.pathname : Date.now()
    this.post = JSON.parse(localStorage.getItem(this.id)) || this.props.post || this.defaultPost()
    this.save()
    navigateTo(`?id=${this.id}`)
  }
  componentWillUpdate (prevProps, prevState) {
    this.scheduleSave()
    return false
  }
  save () {
    localStorage.setItem(this.id, JSON.stringify(this.post))
    this.timer = false
    console.log('saved')
  }
  scheduleSave () {
    if (this.timer) return false
    // Save 1 second after last change to throttle saves
    this.timer = setTimeout(() => this.save(), 1000)
  }
  onChange (field, content) {
    this.post[field] = content
    this.scheduleSave()
  }
  render () {
    return (
      <Post transition={transition} post={this.post} editable={true} handleChange={this.onChange.bind(this)} />
    )
  }
}

export default NewBlogPage
