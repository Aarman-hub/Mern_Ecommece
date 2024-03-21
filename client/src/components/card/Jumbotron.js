import React from 'react'

const Jumbotron = ({title, subTitle}) => {
  return (
    <div className='container-fluid jumbotron'>
        <div className='row'>
            <div className='col text-center p-5'>
                <h2 className='fw-bold'>{title}</h2>
                <p className='lead'>{subTitle}</p>
            </div>
        </div>
    </div>
  )
}

export default Jumbotron