import React from 'react'
import { Helmet } from 'react-helmet'

const title = ({title = 'Chit Chat',description='it is the app to chat'}) => {
  return (
    <Helmet>
        <title> {title} </title>
        <meta name='description' content={description} />
    </Helmet>
  )
}

export default title
