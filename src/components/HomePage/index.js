import React from 'react'

export default function HomePage(props) {

  const { content } = props

  if (!content.uid) return <div/>

  const title = content.getText('home.title')
  const body = content.getHtml('home.body')
  const thumbnail = content.getImage('home.photo').views.small.url
  const photo = content.getImage('home.photo').main.url

  return (
    <li key={content.id}>
      <div>Title: {title}</div>
      <div>Thumbnail: {thumbnail}</div>
      <div>Photo: {photo}</div>
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </li>
  )

}
