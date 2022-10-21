import React from 'react'

const Jumbotron = ({title, subTitle}) => {
  return (
    <div className='container-fluid bg-primary'>
        <div className='row'>
            <div className='col bg-light text-center p-3'>
                <h2>{title}</h2>
                <p className='lead'>{subTitle}</p>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron