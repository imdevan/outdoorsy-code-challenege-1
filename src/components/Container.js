import React from 'react'

const containerStyle = {
  padding: '1rem',
}

const Container = ({children}) => {

  return (
    <div style={containerStyle} >
      {children}
    </div>
  )
}

export default Container