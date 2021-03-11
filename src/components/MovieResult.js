import React from 'react'

const movieResultStyle = {
  border: '2px solid black',
  padding: '1rem',
  marginBottom: '0.5rem'
}

const MovieResult = ({movie}) => {
  if(!movie) 
    return null;

  const {original_title, release_date} = movie;

  return (
    <div style={movieResultStyle} >
      <h3>
        {original_title}
      </h3>
      <p>
        {release_date}
      </p>
    </div>
  )
}

export default MovieResult