import React from "react"
import Post from '../../components/blog/post'

const NewBlogPage = () => {
  let placeholder = {
    title: 'Here we go',
    date: '2017-11-07',
    html: 'Say what you must..'
  }
  return (
    <Post post={placeholder} editable={true} />
  )

}

export default NewBlogPage
